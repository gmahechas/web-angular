import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Country } from '@web/app/one/country/models/country.model';

@Component({
  selector: 'app-form-country',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-country.component.html',
  styles: []
})
export class FormCountryComponent implements OnChanges, OnInit {

  @Input() country: Country;
  @Output() submitted: EventEmitter<Country> = new EventEmitter<Country>();

  countryForm: FormGroup = this.formBuilder.group({
    country: this.formBuilder.group({
      country_name: this.formBuilder.control('', [Validators.required]),
      country_code: this.formBuilder.control('', [Validators.required, Validators.minLength(2)])
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.country) {
      this.countryForm.reset();
      this.countryForm.setValue({
        country: {
          country_name: this.country.country_name,
          country_code: this.country.country_code,
        }
      });
    }
  }

  ngOnInit() {
  }

  onSubmit(countryForm: FormGroup) {

    if (this.country) {
      if (countryForm.dirty) {
        const updated = {
          country_id: this.country.country_id,
          ...countryForm.value.country
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit(countryForm.value.country);
    }

  }

}
