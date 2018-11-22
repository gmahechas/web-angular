import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromProfile from '@web/app/features/c/profile/store';
import * as fromCore from '@web/app/core/store';

import { Profile } from '@web/app/features/c/profile/models/profile.model';

@Component({
  selector: 'app-form-page-profile',
  templateUrl: './form-page-profile.component.html',
  styles: []
})
export class FormPageProfileComponent implements OnInit {

  pending$ = this.store.pipe(select(fromProfile.getPending));
  profile$ = this.store.pipe(select(fromProfile.getSelectedByRouter));

  constructor(
    private store: Store<fromProfile.State>
  ) { }

  ngOnInit() {
  }

  onStore(profile: Profile) {
    this.store.dispatch(new fromProfile.StoreEntity({ entity: profile }));
  }

  onUpdate(profile: Profile) {
    this.store.dispatch(new fromProfile.UpdateEntity({ entity: profile }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['profile']
    }));
  }

  onDestroy(profile: Profile) {
    this.store.dispatch(new fromProfile.DestroyEntity({ entity: profile }));
  }

  onProfileMenu(profile: Profile) {
    this.store.dispatch(new fromCore.Go({
      path: ['profile', profile.profile_id, { outlets: { 'router-outlet-profile-menu': ['profile-menu', profile.profile_id] } }]
    }));
  }
}
