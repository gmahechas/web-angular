import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromWorkflow from '@web/app/features/e/workflow/store';

import { SearchWorkflow } from '@web/app/features/e/workflow/models/search-workflow.model';

@Component({
  selector: 'app-dropdown-page-workflow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-workflow.component.html',
  styles: []
})
export class DropdownPageWorkflowComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() filter = true;
  @Input() placeholder: string[];
  @Input() filterPlaceholder: string[];
  @Input() showClear: boolean;
  @Input() dropdownIcon: string;
  @Input() emptyFilterMessage: string[];
  @Input() isConditional = false;
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() keyUpTimes = 3;
  @Input() searchWorkflow: SearchWorkflow;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromWorkflow.getAllEntities));
  entityId = 'workflow_id';

  constructor(
    private store: Store<fromWorkflow.State>
  ) { }

  ngOnInit() {
  }

  onLoad(searchWorkflow: SearchWorkflow) {
    this.store.dispatch(new fromWorkflow.LoadEntityShared({
      search: searchWorkflow
    }));
  }

  keyUp(event) {
    this.onLoad({
      workflow: {
        workflow_id: '',
        workflow_name: event
      }
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
