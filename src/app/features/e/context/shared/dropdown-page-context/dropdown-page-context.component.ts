import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromContext from '@web/app/features/e/context/store';

import { SearchContext } from '@web/app/features/e/context/models/search-context.model';

@Component({
  selector: 'app-dropdown-page-context',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-context.component.html',
  styles: []
})
export class DropdownPageContextComponent implements OnChanges, OnInit {

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
  @Input() searchContext: SearchContext;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromContext.getAllEntities));
  entityId = 'context_id';

  constructor(
    private store: Store<fromContext.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(new fromContext.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
  }

  onLoad(searchContext: SearchContext) {
    this.store.dispatch(new fromContext.LoadEntityShared({
      search: searchContext
    }));
  }

  keyUp(event) {
    this.onLoad({
      context: {
        context_id: '',
        context_description: event
      },
      menu: (this.searchContext) ? (this.searchContext.menu) ? this.searchContext.menu : null : null
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
