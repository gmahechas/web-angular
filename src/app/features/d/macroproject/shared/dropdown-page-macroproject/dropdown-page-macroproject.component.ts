import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromMacroproject from '@web/app/features/d/macroproject/store';
import { initialState } from '@web/app/features/d/macroproject/store/reducers/search-macroproject.reducer';

import { SearchMacroproject } from '@web/app/features/d/macroproject/models/search-macroproject.model';

@Component({
  selector: 'app-dropdown-page-macroproject',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-macroproject.component.html',
  styles: []
})
export class DropdownPageMacroprojectComponent implements OnChanges, OnInit {

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
  @Input() searchByKeyUp = true;
  @Input() isConditional = false;
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() keyUpTimes = 3;
  @Input() loadOnInit = false;
  @Input() searchMacroproject: SearchMacroproject;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromMacroproject.getAllEntities));
  entityId = 'macroproject_id';

  constructor(
    private store: Store<fromMacroproject.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(new fromMacroproject.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchMacroproject) {
      setTimeout(() => {
        this.onLoad({
          macroproject: (this.searchMacroproject.macroproject) ? this.searchMacroproject.macroproject : null,
          city: (this.searchMacroproject.city) ? this.searchMacroproject.city : null,
          office: (this.searchMacroproject.office) ? this.searchMacroproject.office : null
        });
      });
    }
  }

  onLoad(searchMacroproject: SearchMacroproject) {
    this.store.dispatch(new fromMacroproject.LoadEntityShared({
      search: searchMacroproject
    }));
  }

  keyUp(event) {
    this.onLoad({
      macroproject: {
        ...initialState.query.macroproject,
        [this.optionLabel]: event
      },
      city: (this.searchMacroproject) ? (this.searchMacroproject.city) ? this.searchMacroproject.city : null : null,
      office: (this.searchMacroproject) ? (this.searchMacroproject.office) ? this.searchMacroproject.office : null : null
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
