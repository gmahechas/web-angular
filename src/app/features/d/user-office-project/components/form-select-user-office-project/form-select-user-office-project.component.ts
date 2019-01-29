
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';
import { UserOfficeProject } from '@web/app/features/d/user-office-project/models/user-office-project.model';

@Component({
  selector: 'app-form-select-user-office-project',
  templateUrl: './form-select-user-office-project.component.html',
  styles: []
})
export class FormSelectUserOfficeProjectComponent implements OnInit {

  @Input() userOffice: UserOffice;
  @Output() selectedUserOfficeProject: EventEmitter<UserOfficeProject> = new EventEmitter<UserOfficeProject>();
  userOfficeProject: UserOfficeProject;

  userOfficeProjectForm = this.formBuilder.group({
    userOfficeProject: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.userOfficeProject = {
      user_office_project_status: true,
      user_office: this.userOffice
    };
  }

  onSubmit() {
    this.selectedUserOfficeProject.emit({
      user_office_project_id: this.userOfficeProjectForm.value.userOfficeProject.user_office_project_id,
      project: this.userOfficeProjectForm.value.userOfficeProject.project,
    });
  }
}
