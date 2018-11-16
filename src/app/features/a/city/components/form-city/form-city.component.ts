import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { City } from '@web/app/features/a/city/models/city.model';

@Component({
  selector: 'app-form-city',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-city.component.html',
  styles: []
})
export class FormCityComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.cityForm.disable();
    } else {
      this.cityForm.enable();
    }
  }
  @Input() city: City;
  @Output() submitted: EventEmitter<City> = new EventEmitter<City>();

  cityForm = this.formBuilder.group({
    city: this.formBuilder.group({
      city_name: this.formBuilder.control('', [Validators.required]),
      city_code: this.formBuilder.control('', [Validators.required, Validators.minLength(2)])
    }),
    estate: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.city) {
      this.cityForm.reset();
      this.cityForm.setValue({
        city: {
          city_name: this.city.city_name,
          city_code: this.city.city_code
        },
        estate: this.city.estate
      });
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.city) {
      if (this.cityForm.dirty) {
        const updated = {
          city_id: this.city.city_id,
          ...this.cityForm.value.city,
          estate_id: this.cityForm.value.estate.estate_id
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit({ ...this.cityForm.value.city, estate_id: this.cityForm.value.estate.estate_id });
    }

  }

}
