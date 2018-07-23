import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { City } from './../../models/city.model';

@Component({
  selector: 'app-form-city',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-city.component.html',
  styles: []
})
export class FormCityComponent implements OnChanges, OnInit {

  @Input() city: City;
  @Output() submitted: EventEmitter<City> = new EventEmitter<City>();

  cityForm: FormGroup = this.formBuilder.group({
    city: this.formBuilder.group({
      city_name: this.formBuilder.control('', [Validators.required]),
      city_code: this.formBuilder.control('', [Validators.required, Validators.minLength(2)])
    }),
    estate: this.formBuilder.control('', [Validators.required])
  });

  ngOnChanges() {
    if (this.city) {
      this.cityForm.reset();
      this.cityForm.setValue({
        city: {
          city_name: this.city.city_name,
          city_code: this.city.city_code
        },
        estate: this.city['estate']
      });
    }
  }

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  onSubmit(cityForm: FormGroup) {

    if (this.city) {
      if (this.cityForm.dirty && this.cityForm.valid) {
        const updated = {
          city: {
            ...cityForm.value.city,
            city_id: this.city.city_id
          },
          estate: this.cityForm.value.estate
        };
        this.submitted.emit(updated);
      }
    } else {
      if (this.cityForm.valid) {
        this.submitted.emit(cityForm.value);
      }
    }

  }

}
