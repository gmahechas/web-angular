import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Estate } from './../../models/estate.model';

@Component({
  selector: 'app-form-estate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-estate.component.html',
  styleUrls: ['./form-estate.component.scss']
})
export class FormEstateComponent implements OnChanges, OnInit {

  @Input() estate: Estate;
  @Output() submitted: EventEmitter<Estate> = new EventEmitter<Estate>();
  configDropDownCountry: any;

  estateForm: FormGroup = this.formBuilder.group({
    estate: this.formBuilder.group({
      estate_name: new FormControl('', [Validators.required]),
      estate_code: new FormControl('', [Validators.required, Validators.minLength(2)])
    }),
    country: new FormControl('', [Validators.required])
  });

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

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.configDropDownCountry = {
      placeholder: 'Pais',
      dataKey: 'country_id',
      optionLabel: 'country_name'
    };
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
        /*         this.submitted.emit(updatedEstate); */
      }
    } else {
      if (this.estateForm.valid) {
        /*         this.submitted.emit(estateForm.value); */
      }
    }

  }
}
