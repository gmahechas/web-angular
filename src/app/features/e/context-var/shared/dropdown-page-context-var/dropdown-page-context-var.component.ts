import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromContextVar from '@web/app/features/e/context-var/store';

import { SearchContextVar } from '@web/app/features/e/context-var/models/search-context-var.model';

@Component({
  selector: 'app-dropdown-page-context-var',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-context-var.component.html',
  styles: []
})
export class DropdownPageContextVarComponent implements OnInit {

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
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() keyUpTimes = 3;
  @Input() searchContextVar: SearchContextVar;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromContextVar.getAllEntities));
  entityId = 'context_var_id';

  constructor(
    private store: Store<fromContextVar.State>
  ) { }

  ngOnInit() {
  }

  onLoad(searchContextVar: SearchContextVar) {
    this.store.dispatch(new fromContextVar.LoadEntityShared({
      search: searchContextVar
    }));
  }

  keyUp(event) {
    this.onLoad({
      context_var: {
        context_var_id: '',
        context_var_code: '',
        context_var_type: '',
        context_var_description: event
      },
      context: null
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
