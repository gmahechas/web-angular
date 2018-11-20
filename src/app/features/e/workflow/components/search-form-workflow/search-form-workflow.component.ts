import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SearchWorkflow } from '@web/app/features/e/workflow/models/search-workflow.model';

@Component({
  selector: 'app-search-form-workflow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-workflow.component.html',
  styles: []
})
export class SearchFormWorkflowComponent implements OnChanges, OnInit {

  @Input() query: SearchWorkflow;
  @Output() search: EventEmitter<SearchWorkflow> = new EventEmitter<SearchWorkflow>();
  @Output() create: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() resetSearch: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchFormWorkflow = this.formBuilder.group({
    workflow: this.formBuilder.group({
      workflow_id: this.formBuilder.control(''),
      workflow_name: this.formBuilder.control('')
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormWorkflow.setValue({
      workflow: {
        workflow_id: this.query.workflow.workflow_id,
        workflow_name: this.query.workflow.workflow_name
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.search.emit(this.searchFormWorkflow.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}
