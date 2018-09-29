import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromProfile from '../../../profile/store';

import { Profile } from '../../../profile/models';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-profile-menu',
  templateUrl: './index-page-profile-menu.component.html',
  styles: []
})
export class IndexPageProfileMenuComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  data$ = this.store.pipe(select(fromStore.getAllEntities));
  profile: Profile;

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
    this.subscription = this.store.pipe(
      select(fromProfile.getSelectedByRouter),
      filter(profile => profile !== undefined)
    ).subscribe(
      (profile: Profile) => {
        this.profile = profile;
        this.store.dispatch(new fromStore.LoadEntity({
          search: {
            profile: {
              profile_id: String(profile.profile_id)
            }
          }
        }));
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
