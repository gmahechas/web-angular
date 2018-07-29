import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Estate } from './../../models/estate.model';
import { Country } from './../../../country/models/country.model';

@Component({
  selector: 'app-form-estate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-estate.component.html',
  styles: []
})
export class FormEstateComponent implements OnChanges, OnInit {

  @Output() submitted: EventEmitter<{ estate: Estate, country: Country }> = new EventEmitter<{ estate: Estate, country: Country }>();
  @Output() fromKeyUp: EventEmitter<string> = new EventEmitter<string>();
  @Input() estate: Estate;

  estateForm: FormGroup = this.formBuilder.group({
    estate: this.formBuilder.group({
      estate_name: this.formBuilder.control('', [Validators.required]),
      estate_code: this.formBuilder.control('', [Validators.required, Validators.minLength(2)])
    }),
    country: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.estate) {
      this.estateForm.reset();
      this.estateForm.setValue({
        estate: {
          estate_name: this.estate.estate_name,
          estate_code: this.estate.estate_code
        },
        country: this.estate['country']
      });
    }
  }

  ngOnInit() {
  }

  onSubmit(estateForm: FormGroup) {

    if (this.estate) {
      if (this.estateForm.dirty && this.estateForm.valid) {
        const updated = {
          estate: {
            ...estateForm.value.estate,
            estate_id: this.estate.estate_id
          },
          country: this.estateForm.value.country
        };
        this.submitted.emit(updated);
      }
    } else {
      if (this.estateForm.valid) {
        this.submitted.emit(estateForm.value);
      }
    }

  }

  keyUp(event) {
    this.fromKeyUp.emit(event);
  }
}
