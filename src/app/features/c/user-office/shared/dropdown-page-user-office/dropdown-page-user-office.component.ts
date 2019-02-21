import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
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
export class DropdownPageUserOfficeComponent implements OnInit {

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
  @Input() searchUserOffice: SearchUserOffice;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromUserOffice.getAllEntities));
  entityId = 'user_office_id';

  constructor(
    private store: Store<fromUserOffice.State>
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.onLoad({
        user_office: {
          user_office_id: '',
          user_office_status:
            (this.searchUserOffice.user_office.user_office_status) ?
              this.searchUserOffice.user_office.user_office_status : null
        },
        user: (this.searchUserOffice.user) ? this.searchUserOffice.user : null,
        office: (this.searchUserOffice.office) ? this.searchUserOffice.office : null
      });
    });
  }

  onLoad(searchUserOffice: SearchUserOffice) {
    this.store.dispatch(new fromUserOffice.LoadEntityShared({
      search: searchUserOffice
    }));
  }

  keyUp(event) {
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
