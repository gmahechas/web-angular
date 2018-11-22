import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';

@Component({
  selector: 'app-form-select-user-office',
  templateUrl: './form-select-user-office.component.html',
  styles: []
})
export class FormSelectUserOfficeComponent implements OnInit {

  @Input() userOffice: UserOffice;

  userOfficeForm = this.formBuilder.group({
    userOffice: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  onSubmit() {
  }

}
