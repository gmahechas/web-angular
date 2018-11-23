import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromWorkflow from '@web/app/features/e/workflow/store';

@Component({
  selector: 'app-dropdown-page-workflow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-workflow.component.html',
  styles: []
})
export class DropdownPageWorkflowComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() placeholder: string;
  @Input() filterPlaceholder: string;
  @Output() changeDropdown: EventEmitter<any> = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromWorkflow.getAllEntities));
  entityId = 'workflow_id';

  constructor(
    private store: Store<fromWorkflow.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromWorkflow.LoadEntityShared({
      search: {
        workflow: {
          workflow_id: '',
          workflow_name: event
        }
      }
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
