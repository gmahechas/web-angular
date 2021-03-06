import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromProfile from '@web/app/features/c/profile/store';
import { initialState } from '@web/app/features/c/profile/store/reducers/search-profile.reducer';

import { SearchProfile } from '@web/app/features/c/profile/models/search-profile.model';

@Component({
  selector: 'app-dropdown-page-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-profile.component.html',
  styles: []
})
export class DropdownPageProfileComponent implements OnChanges, OnInit {

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
  @Input() searchProfile: SearchProfile;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromProfile.getAllEntities));
  entityId = 'profile_id';

  constructor(
    private store: Store<fromProfile.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(fromProfile.EntityActions.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchProfile) {
      setTimeout(() => {
        this.onLoad({
          profile: (this.searchProfile.profile) ? this.searchProfile.profile : null
        });
      });
    }
  }

  onLoad(searchProfile: SearchProfile) {
    this.store.dispatch(fromProfile.EntityActions.LoadEntityShared({
      search: searchProfile
    }));
  }

  keyUp(event) {
    this.onLoad({
      profile: {
        ...initialState.query.profile,
        [this.optionLabel]: event
      }
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
