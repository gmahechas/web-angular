import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UserOfficeProject } from '@web/app/features/d/user-office-project/models/user-office-project.model';
import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';
import { Project } from '@web/app/features/d/project/models/project.model';

@Component({
  selector: 'app-form-user-office-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-user-office-project.component.html',
  styles: []
})
export class FormUserOfficeProjectComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.userOfficeProjectForm.disable();
    } else {
      this.userOfficeProjectForm.enable();
    }
  }
  @Input() entityLabel: string;
  @Input() userOffice: UserOffice;
  @Input() project: Project;
  @Output() submitted = new EventEmitter<UserOfficeProject>();

  userOfficeProjectForm = this.formBuilder.group({
    user_office: this.formBuilder.control('', [Validators.required]),
    project: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    switch (this.entityLabel) {
      case 'user':
      case 'office':
        this.userOfficeProjectForm.setValue({
          user_office: this.userOffice,
          project: null
        });
        break;
      case 'project':
        this.userOfficeProjectForm.setValue({
          user_office: null,
          project: this.project
        });
        break;
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted.emit({
      user_office_project_status: true,
      user_office_id: this.userOfficeProjectForm.value.user_office.user_office_id,
      project_id: this.userOfficeProjectForm.value.project.project_id
    });
    switch (this.entityLabel) {
      case 'user':
      case 'office':
        this.userOfficeProjectForm.controls.project.reset();
        break;
      case 'project':
        this.userOfficeProjectForm.controls.user_office.reset();
        break;
    }
  }
}
