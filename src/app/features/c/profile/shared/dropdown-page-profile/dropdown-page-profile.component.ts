import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromProfile from '@web/app/features/c/profile/store';

import { SearchProfile } from '@web/app/features/c/profile/models/search-profile.model';

@Component({
  selector: 'app-dropdown-page-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-profile.component.html',
  styles: []
})
export class DropdownPageProfileComponent implements OnInit {

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
  @Input() searchProfile: SearchProfile;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromProfile.getAllEntities));
  entityId = 'profile_id';

  constructor(
    private store: Store<fromProfile.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromProfile.LoadEntityShared({
      search: {
        profile: {
          profile_id: '',
          profile_name: event
        }
      }
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
