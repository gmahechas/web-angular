import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromWorkflow from '@web/app/features/e/workflow/store';
import { initialState } from '@web/app/features/e/workflow/store/reducers/search-workflow.reducer';

import { SearchWorkflow } from '@web/app/features/e/workflow/models/search-workflow.model';

@Component({
  selector: 'app-dropdown-page-workflow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-workflow.component.html',
  styles: []
})
export class DropdownPageWorkflowComponent implements OnChanges, OnInit {

  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() filter = true;
  @Input() onlyShow: 'store' | 'store_form' | 'form' = 'store_form';
  @Input() placeholder: string[];
  @Input() filterPlaceholder: string[];
  @Input() showClear: boolean;
  @Input() dropdownIcon: string;
  @Input() emptyFilterMessage: string[];
  @Input() isConditional = false;
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() keyUpTimes = 3;
  @Input() loadOnInit = false;
  @Input() searchWorkflow: SearchWorkflow;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromWorkflow.getAllEntities));
  entityId = 'workflow_id';

  constructor(
    private store: Store<fromWorkflow.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(new fromWorkflow.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchWorkflow) {
      setTimeout(() => {
        this.onLoad({
          workflow: (this.searchWorkflow.workflow) ? this.searchWorkflow.workflow : null
        });
      });
    }
  }

  onLoad(searchWorkflow: SearchWorkflow) {
    this.store.dispatch(new fromWorkflow.LoadEntityShared({
      search: searchWorkflow
    }));
  }

  keyUp(event) {
    this.onLoad({
      workflow: {
        ...initialState.query.workflow,
        [this.optionLabel]: event
      }
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
