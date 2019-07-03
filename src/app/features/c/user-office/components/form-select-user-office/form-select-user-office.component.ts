import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '@web/app/features/c/user/models/user.model';
import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';
import { SearchUserOffice } from '@web/app/features/c/user-office/models/search-user-office.model';

@Component({
  selector: 'app-form-select-user-office',
  templateUrl: './form-select-user-office.component.html',
  styles: []
})
export class FormSelectUserOfficeComponent implements OnInit {

  @Input() user: User;
  @Output() selectedUserOffice = new EventEmitter<UserOffice>();
  searchUserOffice: SearchUserOffice;

  userOfficeForm = this.formBuilder.group({
    userOffice: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.searchUserOffice = {
      user_office: {
        user_office_id: '',
        user_office_status: true
      },
      user: this.user,
      office: null
    };
  }

  onSubmit() {
    this.selectedUserOffice.emit({
      user_office_id: this.userOfficeForm.value.userOffice.user_office_id,
      office: this.userOfficeForm.value.userOffice.office
    });
  }

}
