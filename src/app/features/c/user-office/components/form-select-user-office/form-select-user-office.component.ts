import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '@web/app/features/c/user/models/user.model';
import { Office } from '@web/app/features/b/office/models';
import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';

@Component({
  selector: 'app-form-select-user-office',
  templateUrl: './form-select-user-office.component.html',
  styles: []
})
export class FormSelectUserOfficeComponent implements OnInit {

  @Input() user: User;
  @Output() selectedOffice: EventEmitter<Office> = new EventEmitter<Office>();
  userOffice: UserOffice;

  userOfficeForm = this.formBuilder.group({
    userOffice: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.userOffice = {
      user_office_status: true,
      user: this.user
    };
  }

  onSubmit() {
    this.selectedOffice.emit(this.userOfficeForm.value.userOffice.office);
  }

}
