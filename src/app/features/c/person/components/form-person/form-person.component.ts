import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Person } from '@web/app/features/c/person/models/person.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-form-person',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-person.component.html',
  styles: []
})
export class FormPersonComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.personForm.disable();
    } else {
      this.personForm.enable();
    }
  }
  @Input() person: Person;
  @Output() submitted: EventEmitter<Person> = new EventEmitter<Person>();

  personForm = this.formBuilder.group({
    person: this.formBuilder.group({
      person_identification: ['', {
        validators: [Validators.required],
        asyncValidators: [this.validateIdentification.bind(this)],
        updateOn: 'blur'
      }],
      person_identification_date_issue: this.formBuilder.control(''),
      person_first_name: this.formBuilder.control(''),
      person_second_name: this.formBuilder.control(''),
      person_first_surname: this.formBuilder.control(''),
      person_second_surname: this.formBuilder.control(''),
      person_legal_name: this.formBuilder.control(''),
      person_address: this.formBuilder.control(''),
      person_email: this.formBuilder.control(''),
      person_phone: this.formBuilder.control('')
    }),
    type_person: this.formBuilder.control('', [Validators.required]),
    type_person_identification: this.formBuilder.control('', [Validators.required]),
    city_issue: this.formBuilder.control('', [Validators.required]),
    city_location: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.person) {
      this.personForm.reset();
      this.personForm.setValue({
        person: {
          person_identification: this.person.person_identification,
          person_identification_date_issue: this.person.person_identification_date_issue,
          person_first_name: this.person.person_first_name,
          person_second_name: this.person.person_second_name,
          person_first_surname: this.person.person_first_surname,
          person_second_surname: this.person.person_second_surname,
          person_legal_name: this.person.person_legal_name,
          person_address: this.person.person_address,
          person_email: this.person.person_email,
          person_phone: this.person.person_phone,
        },
        type_person: this.person.type_person,
        type_person_identification: this.person.type_person_identification,
        city_issue: this.person.city_issue,
        city_location: this.person.city_location
      });
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.person) {
      if (this.personForm.dirty) {
        const updated = {
          person_id: this.person.person_id,
          ...this.personForm.value.person,
          type_person_id: this.personForm.value.type_person.type_person_id,
          type_person_identification_id: this.personForm.value.type_person_identification.type_person_identification_id,
          city_issue_id: this.personForm.value.city_issue.city_id,
          city_location_id: this.personForm.value.city_location.city_id
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit({
        ...this.personForm.value.person,
        type_person_id: this.personForm.value.type_person.type_person_id,
        type_person_identification_id: this.personForm.value.type_person_identification.type_person_identification_id,
        city_issue_id: this.personForm.value.city_issue.city_id,
        city_location_id: this.personForm.value.city_location.city_id
      });
    }

  }

  validateIdentification(control: AbstractControl) {
    return of((control.value !== '1110451561') ? null : { invalidIdentification: true });
  }
}
