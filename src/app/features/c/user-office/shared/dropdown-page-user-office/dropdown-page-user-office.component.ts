import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromUserOffice from '@web/app/features/c/user-office/store';

import { SearchUserOffice } from '@web/app/features/c/user-office/models/search-user-office.model';

@Component({
  selector: 'app-dropdown-page-user-office',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-user-office.component.html',
  styles: []
})
export class DropdownPageUserOfficeComponent implements OnChanges, OnInit {

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
  @Input() searchUserOffice: SearchUserOffice;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromUserOffice.getAllEntities));
  entityId = 'user_office_id';

  constructor(
    private store: Store<fromUserOffice.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(new fromUserOffice.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchUserOffice) {
      setTimeout(() => {
        this.onLoad({
          user_office: (this.searchUserOffice.user_office) ? this.searchUserOffice.user_office : null,
          user: (this.searchUserOffice.user) ? this.searchUserOffice.user : null,
          office: (this.searchUserOffice.office) ? this.searchUserOffice.office : null
        });
      });
    }

  }

  onLoad(searchUserOffice: SearchUserOffice) {
    this.store.dispatch(new fromUserOffice.LoadEntityShared({
      search: searchUserOffice
    }));
  }

  keyUp(event) {
    this.onLoad({
      user_office: (this.searchUserOffice) ? (this.searchUserOffice.user_office) ? this.searchUserOffice.user_office : null : null,
      user: (this.searchUserOffice) ? (this.searchUserOffice.user) ? this.searchUserOffice.user : null : null,
      office: (this.searchUserOffice) ? (this.searchUserOffice.office) ? this.searchUserOffice.office : null : null,
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
