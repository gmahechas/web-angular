import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { TypePerson } from '@web/app/features/c/type-person/models/type-person.model';

@Component({
  selector: 'app-form-type-person',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-type-person.component.html',
  styles: []
})
export class FormTypePersonComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.typePersonForm.disable();
    } else {
      this.typePersonForm.enable();
    }
  }
  @Input() typePerson: TypePerson;
  @Output() submitted = new EventEmitter<TypePerson>();

  typePersonForm = this.formBuilder.group({
    type_person: this.formBuilder.group({
      type_person_code: this.formBuilder.control('', [Validators.required]),
      type_person_description: this.formBuilder.control('', [Validators.required]),
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.typePerson) {
      this.typePersonForm.reset();
      this.typePersonForm.setValue({
        type_person: {
          type_person_code: this.typePerson.type_person_code,
          type_person_description: this.typePerson.type_person_description
        }
      });
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.typePerson) {
      if (this.typePersonForm.dirty) {
        const updated = {
          type_person_id: this.typePerson.type_person_id,
          ...this.typePersonForm.value.type_person
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit({ ...this.typePersonForm.value.type_person });
    }

  }

}
