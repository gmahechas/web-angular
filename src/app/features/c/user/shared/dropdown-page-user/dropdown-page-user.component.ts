import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromUser from '@web/app/features/c/user/store';
import { initialState } from '@web/app/features/c/user/store/reducers/search-user.reducer';

import { SearchUser } from '@web/app/features/c/user/models/search-user.model';

@Component({
  selector: 'app-dropdown-page-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-user.component.html',
  styles: []
})
export class DropdownPageUserComponent implements OnChanges, OnInit {

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
  @Input() searchUser: SearchUser;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromUser.getAllEntities));
  entityId = 'user_id';

  constructor(
    private store: Store<fromUser.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(new fromUser.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchUser) {
      setTimeout(() => {
        this.onLoad({
          user: (this.searchUser.user) ? this.searchUser.user : null,
          person: (this.searchUser.person) ? this.searchUser.person : null,
          profile: (this.searchUser.profile) ? this.searchUser.profile : null
        });
      });
    }
  }

  onLoad(searchUser: SearchUser) {
    this.store.dispatch(new fromUser.LoadEntityShared({
      search: searchUser
    }));
  }

  keyUp(event) {
    this.onLoad({
      user: {
        ...initialState.query.user,
        [this.optionLabel]: event
      },
      person: (this.searchUser) ? (this.searchUser.person) ? this.searchUser.person : null : null,
      profile: (this.searchUser) ? (this.searchUser.profile) ? this.searchUser.profile : null : null
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
