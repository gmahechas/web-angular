import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, } from '@angular/core';

import { UserOfficeProject } from '@web/app/features/d/user-office-project/models/user-office-project.model';

@Component({
  selector: 'app-edit-form-user-office-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-form-user-office-project.component.html',
  styles: []
})
export class EditFormUserOfficeProjectComponent implements OnInit {

  @Input() userOfficeProject: UserOfficeProject;
  @Output() edit: EventEmitter<UserOfficeProject> = new EventEmitter<UserOfficeProject>();
  @Output() delete: EventEmitter<UserOfficeProject> = new EventEmitter<UserOfficeProject>();

  constructor() { }

  ngOnInit() {
  }

  handleChange(event) {
    this.userOfficeProject = {
      ...this.userOfficeProject,
      user_office_project_status: event
    };
    this.edit.emit(this.userOfficeProject);
  }

  handleDelete() {
    this.delete.emit(this.userOfficeProject);
  }
}
