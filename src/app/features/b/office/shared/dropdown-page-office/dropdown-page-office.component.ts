import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromOffice from '@web/app/features/b/office/store';

import { SearchOffice } from '@web/app/features/b/office/models/search-office.model';

@Component({
  selector: 'app-dropdown-page-office',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-office.component.html',
  styles: []
})
export class DropdownPageOfficeComponent implements OnInit {

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
  @Input() searchOffice: SearchOffice;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromOffice.getAllEntities));
  entityId = 'office_id';

  constructor(
    private store: Store<fromOffice.State>
  ) { }

  ngOnInit() {
  }

  onLoad(searchOffice: SearchOffice) {
    this.store.dispatch(new fromOffice.LoadEntityShared({
      search: searchOffice
    }));
  }

  keyUp(event) {
    this.onLoad(
      {
        office: {
          office_id: '',
          office_name: event
        },
        city: (this.searchOffice) ? (this.searchOffice.city) ? this.searchOffice.city : null : null
      }
    );
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
