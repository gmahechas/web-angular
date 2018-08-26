import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Person } from './../../models/person.model';

@Component({
  selector: 'app-form-person',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-person.component.html',
  styles: []
})
export class FormPersonComponent implements OnChanges, OnInit {

  @Input() person: Person;
  @Output() submitted: EventEmitter<Person> = new EventEmitter<Person>();

  personForm: FormGroup = this.formBuilder.group({
    person: this.formBuilder.group({
      person_business_type: this.formBuilder.control('', [Validators.required]),
      person_identification_type: this.formBuilder.control('', [Validators.required]),
      person_identification: this.formBuilder.control('', [Validators.required]),
      person_first_name: this.formBuilder.control('', [Validators.required]),
      person_second_name: this.formBuilder.control('', [Validators.required]),
      person_first_surname: this.formBuilder.control('', [Validators.required]),
      person_second_surname: this.formBuilder.control('', [Validators.required])
    }),
    city: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.person) {
      this.personForm.reset();
      this.personForm.setValue({
        person: {
          person_business_type: this.person.person_business_type,
          person_identification_type: this.person.person_identification_type,
          person_identification: this.person.person_identification,
          person_first_name: this.person.person_first_name,
          person_second_name: this.person.person_second_name,
          person_first_surname: this.person.person_first_surname,
          person_second_surname: this.person.person_second_surname
        },
        city: this.person.city
      });
    }
  }

  ngOnInit() {
  }

  onSubmit(personForm: FormGroup) {

    if (this.person) {
      if (this.personForm.dirty && this.personForm.valid) {
        const updated = {
          person: {
            ...personForm.value.person,
            person_id: this.person.person_id
          },
          city: this.personForm.value.city
        };
        this.submitted.emit(updated);
      }
    } else {
      if (this.personForm.valid) {
        this.submitted.emit(personForm.value);
      }
    }

  }

}