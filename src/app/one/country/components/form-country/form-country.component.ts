import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Country } from './../../models/country.model';

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
      country_name: new FormControl('', [Validators.required]),
      country_code: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  });

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

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  onSubmit(countryForm: FormGroup) {

    if (this.country) {
      if (this.countryForm.dirty && this.countryForm.valid) {
        const updatedCountry = {
          ...this.country,
          ...countryForm.value.country
        };
        this.submitted.emit(updatedCountry);
      }
    } else {
      if (this.countryForm.valid) {
        this.submitted.emit(countryForm.value.country);
      }
    }

  }

}
