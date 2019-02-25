import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromMacroproject from '@web/app/features/d/macroproject/store';

import { SearchMacroproject } from '@web/app/features/d/macroproject/models/search-macroproject.model';

@Component({
  selector: 'app-dropdown-page-macroproject',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-macroproject.component.html',
  styles: []
})
export class DropdownPageMacroprojectComponent implements OnInit {

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
  @Input() searchMacroproject: SearchMacroproject;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromMacroproject.getAllEntities));
  entityId = 'macroproject_id';

  constructor(
    private store: Store<fromMacroproject.State>
  ) { }

  ngOnInit() {
  }

  onLoad(searchMacroproject: SearchMacroproject) {
    this.store.dispatch(new fromMacroproject.LoadEntityShared({
      search: searchMacroproject
    }));
  }

  keyUp(event) {
    this.onLoad({
      macroproject: {
        macroproject_id: '',
        macroproject_name: event,
      },
      city: (this.searchMacroproject) ? (this.searchMacroproject.city) ? this.searchMacroproject.city : null : null,
      office: (this.searchMacroproject) ? (this.searchMacroproject.office) ? this.searchMacroproject.office : null : null
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
