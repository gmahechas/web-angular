import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Profile } from './../../models/profile.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-page-profile',
  templateUrl: './form-page-profile.component.html',
  styles: []
})
export class FormPageProfileComponent implements OnInit {

  profile$: Observable<Profile>;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.profile$ = store.pipe(select(fromStore.getSelectedByRouter));
  }

  ngOnInit() {
  }

  onStore(profile: Profile) {
    this.store.dispatch(new fromStore.StoreEntity(profile));
  }

  onUpdate(profile: Profile) {
    this.store.dispatch(new fromStore.UpdateEntity(profile));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['profile']
    }));
  }

  onDestroy(profile: Profile) {
    this.store.dispatch(new fromStore.DestroyEntity(profile));
  }

  onProfileMenu(profile: Profile) {
    this.store.dispatch(new fromCore.Go({
      path: ['profile-menu', profile.profile_id]
    }));
  }
}
