import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Macroproject } from '@app/app/three/macroproject/models/macroproject.model';

@Component({
  selector: 'app-form-macroproject',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-macroproject.component.html',
  styles: []
})
export class FormMacroprojectComponent implements OnChanges, OnInit {

  @Input() macroproject: Macroproject;
  @Output() submitted: EventEmitter<Macroproject> = new EventEmitter<Macroproject>();

  macroprojectForm: FormGroup = this.formBuilder.group({
    macroproject: this.formBuilder.group({
      macroproject_name: this.formBuilder.control(''),
      macroproject_address: this.formBuilder.control(''),
      macroproject_phone: this.formBuilder.control('')
    }),
    city: this.formBuilder.control('', [Validators.required]),
    office: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.macroproject) {
      this.macroprojectForm.reset();
      this.macroprojectForm.setValue({
        macroproject: {
          macroproject_name: this.macroproject.macroproject_name,
          macroproject_address: this.macroproject.macroproject_address,
          macroproject_phone: this.macroproject.macroproject_phone
        },
        city: this.macroproject.city,
        office: this.macroproject.office
      });
    }
  }

  ngOnInit() {
  }

  onSubmit(macroprojectForm: FormGroup) {

    if (this.macroproject) {
      if (macroprojectForm.dirty) {
        const updated = {
          macroproject_id: this.macroproject.macroproject_id,
          ...macroprojectForm.value.macroproject,
          city_id: macroprojectForm.value.city.city_id,
          office_id: macroprojectForm.value.office.office_id
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit({
        ...macroprojectForm.value.macroproject,
        city_id: macroprojectForm.value.city.city_id,
        office_id: macroprojectForm.value.office.office_id
      });
    }

  }

}
