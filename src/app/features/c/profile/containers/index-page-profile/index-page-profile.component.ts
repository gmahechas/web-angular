import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/c/profile/store';
import * as fromCore from '@web/app/core/store';

import { Profile } from '@web/app/features/c/profile/models/profile.model';
import { SearchProfile } from '@web/app/features/c/profile/models/search-profile.model';

@Component({
  selector: 'app-index-page-profile',
  templateUrl: './index-page-profile.component.html',
  styles: []
})
export class IndexPageProfileComponent implements OnInit {

  query$ = this.store.pipe(select(fromStore.getQuery));

  data$ = this.store.pipe(select(fromStore.getAllEntities));
  total$ = this.store.pipe(select(fromStore.getTotal));
  perPage$ = this.store.pipe(select(fromStore.getPerPage));
  from$ = this.store.pipe(select(fromStore.getFrom));
  to$ = this.store.pipe(select(fromStore.getTo));
  configTable: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.configTable = {
      dataKey: 'profile_id',
      cols: [
        { fields: ['profile_id'], header: ['profile.model.profile_id'], style: { width: '10%' } },
        { fields: ['profile_name'], header: ['profile.model.profile_name'], style: { width: '90%' } }
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() { }

  onLoad(profileSearch: SearchProfile) {
    this.store.dispatch(new fromStore.LoadEntity({
      search: {
        profile: profileSearch.profile,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromCore.Go({
      path: ['profile', 'create']
    }));
  }

  onEdit(profile: Profile) {
    this.store.dispatch(new fromCore.Go({
      path: ['profile', profile.profile_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromStore.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['profile']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromStore.ResetSearch());
  }
}