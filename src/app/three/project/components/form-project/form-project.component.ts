import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Project } from '@web/app/three/project/models/project.model';

@Component({
  selector: 'app-form-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-project.component.html',
  styles: []
})
export class FormProjectComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.projectForm.disable();
    } else {
      this.projectForm.enable();
    }
  }
  @Input() project: Project;
  @Output() submitted: EventEmitter<Project> = new EventEmitter<Project>();

  projectForm = this.formBuilder.group({
    project: this.formBuilder.group({
      project_name: this.formBuilder.control('', [Validators.required]),
      project_address: this.formBuilder.control('', [Validators.required]),
      project_phone: this.formBuilder.control('', [Validators.required])
    }),
    macroproject: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.project) {
      this.projectForm.reset();
      this.projectForm.setValue({
        project: {
          project_name: this.project.project_name,
          project_address: this.project.project_phone,
          project_phone: this.project.project_phone
        },
        macroproject: this.project.macroproject
      });
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.project) {
      if (this.projectForm.dirty) {
        const updated = {
          project_id: this.project.project_id,
          ...this.projectForm.value.project,
          macroproject_id: this.projectForm.value.macroproject.macroproject_id
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit({ ...this.projectForm.value.project, macroproject_id: this.projectForm.value.macroproject.macroproject_id });
    }

  }

}
