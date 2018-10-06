import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/two/profile/store';
import * as fromCore from '@web/app/core/store';

import { Profile } from '@web/app/two/profile/models/profile.model';

@Component({
  selector: 'app-form-page-profile',
  templateUrl: './form-page-profile.component.html',
  styles: []
})
export class FormPageProfileComponent implements OnInit {

  pending$ = this.store.pipe(select(fromStore.getPending));
  profile$ = this.store.pipe(select(fromStore.getSelectedByRouter));

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  onStore(profile: Profile) {
    this.store.dispatch(new fromStore.StoreEntity({ entity: profile }));
  }

  onUpdate(profile: Profile) {
    this.store.dispatch(new fromStore.UpdateEntity({ entity: profile }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['profile']
    }));
  }

  onDestroy(profile: Profile) {
    this.store.dispatch(new fromStore.DestroyEntity({ entity: profile }));
  }

  onProfileMenu(profile: Profile) {
    this.store.dispatch(new fromCore.Go({
      path: ['profile', profile.profile_id, { outlets: { 'router-outlet-profile-menu': ['profile-menu', profile.profile_id] } }]
    }));
  }
}
