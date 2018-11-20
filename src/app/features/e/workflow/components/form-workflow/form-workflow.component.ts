import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Workflow } from '@web/app/features/e/workflow/models/workflow.model';

@Component({
  selector: 'app-form-workflow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-workflow.component.html',
  styles: []
})
export class FormWorkflowComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.workflowForm.disable();
    } else {
      this.workflowForm.enable();
    }
  }
  @Input() workflow: Workflow;
  @Output() submitted: EventEmitter<Workflow> = new EventEmitter<Workflow>();

  workflowForm = this.formBuilder.group({
    workflow: this.formBuilder.group({
      workflow_name: this.formBuilder.control('', [Validators.required]),
      workflow_description: this.formBuilder.control('', [Validators.required])
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.workflow) {
      this.workflowForm.reset();
      this.workflowForm.setValue({
        workflow: {
          workflow_name: this.workflow.workflow_name,
          workflow_description: this.workflow.workflow_description
        }
      });
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.workflow) {
      if (this.workflowForm.dirty) {
        const updated = {
          workflow_id: this.workflow.workflow_id,
          ...this.workflowForm.value.workflow
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit({ ...this.workflowForm.value.workflow });
    }

  }

}
