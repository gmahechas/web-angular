import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromContextVar from '@web/app/features/e/context-var/store';
import { initialState } from '@web/app/features/e/context-var/store/reducers/search-context-var.reducer';

import { SearchContextVar } from '@web/app/features/e/context-var/models/search-context-var.model';

@Component({
  selector: 'app-dropdown-page-context-var',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-context-var.component.html',
  styles: []
})
export class DropdownPageContextVarComponent implements OnChanges, OnInit {

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
  @Input() searchByKeyUp = true;
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() keyUpTimes = 3;
  @Input() loadOnInit = false;
  @Input() searchContextVar: SearchContextVar;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromContextVar.getAllEntities));
  entityId = 'context_var_id';

  constructor(
    private store: Store<fromContextVar.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(new fromContextVar.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchContextVar) {
      setTimeout(() => {
        this.onLoad({
          context_var: (this.searchContextVar.context_var) ? this.searchContextVar.context_var : null,
          context: (this.searchContextVar.context) ? this.searchContextVar.context : null
        });
      });
    }
  }

  onLoad(searchContextVar: SearchContextVar) {
    this.store.dispatch(new fromContextVar.LoadEntityShared({
      search: searchContextVar
    }));
  }

  keyUp(event) {
    this.onLoad({
      context_var: {
        ...initialState.query.context_var,
        [this.optionLabel]: event
      },
      context: (this.searchContextVar) ? (this.searchContextVar.context) ? this.searchContextVar.context : null : null
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
