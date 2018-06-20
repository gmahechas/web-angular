import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Estate } from './../../models/estate.model';
import { Country } from './../../../country/models/country.model';

@Component({
  selector: 'app-form-estate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-estate.component.html',
  styleUrls: ['./form-estate.component.scss']
})
export class FormEstateComponent implements OnChanges, OnInit {

  @Output() submitted: EventEmitter<{ Estate, Country }> = new EventEmitter<{ Estate, Country }>();
  @Output() fromKeyUp: EventEmitter<string> = new EventEmitter<string>();
  @Input() estate: Estate;
  @Input() countries: Country[];
  configDropDown: any;

  estateForm: FormGroup = this.formBuilder.group({
    estate: this.formBuilder.group({
      estate_name: new FormControl('', [Validators.required]),
      estate_code: new FormControl('', [Validators.required, Validators.minLength(2)])
    }),
    country: new FormControl('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.configDropDown = {
      placeholder: 'Selecciona el pais',
      dataKey: 'country_id',
      optionLabel: 'country_name'
    };
  }

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
        const updatedEstate = {
          ...this.estate,
          ...estateForm.value
        };
        /*         console.log(updatedEstate); */
        this.submitted.emit(updatedEstate);
      }
    } else {
      if (this.estateForm.valid) {
        /*         console.log(estateForm.value); */
        this.submitted.emit(estateForm.value);
      }
    }

  }

  keyUp(event) {
    this.fromKeyUp.emit(event);
  }
}
