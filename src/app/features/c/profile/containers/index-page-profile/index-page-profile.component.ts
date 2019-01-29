import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromProfile from '@web/app/features/c/profile/store';
import * as fromCore from '@web/app/core/store';

import { Profile } from '@web/app/features/c/profile/models/profile.model';
import { SearchProfile } from '@web/app/features/c/profile/models/search-profile.model';
import { SelectedProfile, initialStateSelectedProfile } from '@web/app/features/c/profile/models/selected-profile.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-profile',
  templateUrl: './index-page-profile.component.html',
  styles: []
})
export class IndexPageProfileComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selectedEntity: Profile;

  query$ = this.store.pipe(select(fromProfile.getQuery));

  data$ = this.store.pipe(select(fromProfile.getAllEntities));
  total$ = this.store.pipe(select(fromProfile.getTotal));
  perPage$ = this.store.pipe(select(fromProfile.getPerPage));
  from$ = this.store.pipe(select(fromProfile.getFrom));
  to$ = this.store.pipe(select(fromProfile.getTo));
  configTable: any;

  constructor(
    private store: Store<fromProfile.State>
  ) {
    this.configTable = {
      dataKey: 'profile_id',
      cols: [
        { fields: ['profile_id'], header: ['profile.model.profile_id'], style: { width: '5%' } },
        { fields: ['profile_name'], header: ['profile.model.profile_name'], style: { width: '95%' } }
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(fromProfile.getSelected), take(1)).subscribe(
      (selected: SelectedProfile) => {

        if (selected.gotoProfileMenu && selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(new fromCore.Go({
            path: [
              'profile',
              selected.selectedEntity.profile_id,
              { outlets: { 'router-outlet-profile-menu': ['profile-menu', selected.selectedEntity.profile_id] } }
            ]
          }));
        } else if (selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(new fromCore.Go({
            path: ['profile', selected.selectedEntity.profile_id]
          }));
        }
      }
    );
  }

  onLoad(profileSearch: SearchProfile) {
    this.store.dispatch(new fromProfile.LoadEntity({
      search: {
        profile: profileSearch.profile,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromProfile.SetSelected({ selected: initialStateSelectedProfile }));
    this.store.dispatch(new fromCore.Go({
      path: ['profile', 'create']
    }));
  }

  onEdit(profile: Profile) {
    this.store.dispatch(new fromProfile.SetSelected({ selected: { ...initialStateSelectedProfile, selectedEntity: profile } }));
    this.store.dispatch(new fromCore.Go({
      path: ['profile', profile.profile_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromProfile.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromProfile.SetSelected({ selected: initialStateSelectedProfile }));
    this.store.dispatch(new fromCore.Go({
      path: ['profile']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromProfile.Reset());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
