import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/e/context-var/store';

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
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromStore.getAllEntities));
  entityId = 'context_var_id';

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({
      search: {
        context_var: {
          context_var_id: '',
          context_var_code: '',
          context_var_type: '',
          context_var_description: event
        },
        context: null
      }
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
