import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Office } from '@web/app/one/office/models/office.model';

@Component({
  selector: 'app-form-office',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-office.component.html',
  styles: []
})
export class FormOfficeComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.officeForm.disable();
    } else {
      this.officeForm.enable();
    }
  }
  @Input() office: Office;
  @Output() submitted: EventEmitter<Office> = new EventEmitter<Office>();

  officeForm = this.formBuilder.group({
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

  onSubmit() {

    if (this.office) {
      if (this.officeForm.dirty) {
        const updated = {
          office_id: this.office.office_id,
          ...this.officeForm.value.office,
          city_id: this.officeForm.value.city.city_id
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit({ ...this.officeForm.value.office, city_id: this.officeForm.value.city.city_id });
    }

  }

}

