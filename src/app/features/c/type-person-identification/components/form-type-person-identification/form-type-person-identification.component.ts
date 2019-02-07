import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { TypePersonIdentification } from '@web/app/features/c/type-person-identification/models/type-person-identification.model';

@Component({
  selector: 'app-form-type-person-identification',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-type-person-identification.component.html',
  styles: []
})
export class FormTypePersonIdentificationComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.typePersonIdentificationForm.disable();
    } else {
      this.typePersonIdentificationForm.enable();
    }
  }
  @Input() typePersonIdentification: TypePersonIdentification;
  @Output() submitted = new EventEmitter<TypePersonIdentification>();

  typePersonIdentificationForm = this.formBuilder.group({
    type_person_identification: this.formBuilder.group({
      type_person_identification_code: this.formBuilder.control('', [Validators.required]),
      type_person_identification_description: this.formBuilder.control('', [Validators.required]),
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.typePersonIdentification) {
      this.typePersonIdentificationForm.reset();
      this.typePersonIdentificationForm.setValue({
        type_person_identification: {
          type_person_identification_code: this.typePersonIdentification.type_person_identification_code,
          type_person_identification_description: this.typePersonIdentification.type_person_identification_description
        }
      });
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.typePersonIdentification) {
      if (this.typePersonIdentificationForm.dirty) {
        const updated = {
          type_person_identification_id: this.typePersonIdentification.type_person_identification_id,
          ...this.typePersonIdentificationForm.value.type_person_identification
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit({ ...this.typePersonIdentificationForm.value.type_person_identification });
    }

  }

}
