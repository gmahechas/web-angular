import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Estate } from '@web/app/one/estate/models/estate.model';

@Component({
  selector: 'app-form-estate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-estate.component.html',
  styles: []
})
export class FormEstateComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.estateForm.disable();
    } else {
      this.estateForm.enable();
    }
  }
  @Input() estate: Estate;
  @Output() submitted: EventEmitter<Estate> = new EventEmitter<Estate>();

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
        country: this.estate.country
      });
    }
  }

  ngOnInit() {
  }

  onSubmit(estateForm: FormGroup) {

    if (this.estate) {
      if (estateForm.dirty) {
        const updated = {
          estate_id: this.estate.estate_id,
          ...estateForm.value.estate,
          country_id: estateForm.value.country.country_id
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit({ ...estateForm.value.estate, country_id: estateForm.value.country.country_id });
    }

  }

}
