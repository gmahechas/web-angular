import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Office } from './../../models/office.model';

@Component({
  selector: 'app-form-office',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-office.component.html',
  styles: []
})
export class FormOfficeComponent implements OnChanges, OnInit {

  @Input() office: Office;
  @Output() submitted: EventEmitter<Office> = new EventEmitter<Office>();

  officeForm: FormGroup = this.formBuilder.group({
    office: this.formBuilder.group({
      office_name: this.formBuilder.control('', [Validators.required]),
    }),
    city: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.office) {
      this.officeForm.reset();
      this.officeForm.setValue({
        office: {
          office_name: this.office.office_name
        },
        city: this.office.city
      });
    }
  }

  ngOnInit() {
  }

  onSubmit(officeForm: FormGroup) {

    if (this.office) {
      if (this.officeForm.dirty && this.officeForm.valid) {
        const updated = {
          office: {
            ...officeForm.value.office,
            office_id: this.office.office_id
          },
          city: this.officeForm.value.city
        };
        this.submitted.emit(updated);
      }
    } else {
      if (this.officeForm.valid) {
        this.submitted.emit(officeForm.value);
      }
    }

  }

}

