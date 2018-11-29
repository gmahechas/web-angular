import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';

@Component({
  selector: 'app-edit-user-office',
  templateUrl: './edit-user-office.component.html',
  styles: []
})
export class EditUserOfficeComponent implements OnInit {

  @Input() userOffice: UserOffice;
  @Output() edit: EventEmitter<UserOffice> = new EventEmitter<UserOffice>();
  @Output() delete: EventEmitter<UserOffice> = new EventEmitter<UserOffice>();
  @Output() gotoUserOfficeProject: EventEmitter<UserOffice> = new EventEmitter<UserOffice>();

  constructor() { }

  ngOnInit() {
  }

  handleChange(event) {
    this.userOffice = {
      ...this.userOffice,
      user_office_status: event
    };
    this.edit.emit(this.userOffice);
  }

  handleDelete() {
    this.delete.emit(this.userOffice);
  }

  onUserOfficeProject(userOffice: UserOffice) {
    this.gotoUserOfficeProject.emit(userOffice);
  }
}
