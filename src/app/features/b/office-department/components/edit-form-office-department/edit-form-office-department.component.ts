import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { OfficeDepartment } from '@web/app/features/b/office-department/models/office-department.model';

@Component({
  selector: 'app-edit-form-office-department',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-form-office-department.component.html',
  styles: []
})
export class EditFormOfficeDepartmentComponent implements OnInit {

  @Input() officeDepartment: OfficeDepartment;
  @Output() edit = new EventEmitter<OfficeDepartment>();
  @Output() delete = new EventEmitter<OfficeDepartment>();

  constructor() { }

  ngOnInit() {
  }

  handleChange(event) {
    this.officeDepartment = {
      ...this.officeDepartment,
      office_department_status: event
    };
    this.edit.emit(this.officeDepartment);
  }

  handleDelete() {
    this.delete.emit(this.officeDepartment);
  }

}
