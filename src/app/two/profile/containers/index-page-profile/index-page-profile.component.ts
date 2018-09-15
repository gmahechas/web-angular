import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Profile } from './../../models/profile.model';
import { SearchProfile } from './../../models/search-profile.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-index-page-profile',
  templateUrl: './index-page-profile.component.html',
  styles: []
})
export class IndexPageProfileComponent implements OnInit {

  query$: Observable<SearchProfile>;

  data$: Observable<Profile[]>;
  total$: Observable<number>;
  perPage$: Observable<number>;
  from$: Observable<number>;
  to$: Observable<number>;
  configTable: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.data$ = store.pipe(select(fromStore.getAllEntities));
    this.query$ = store.pipe(select(fromStore.getQuery));
    this.total$ = store.pipe(select(fromStore.getTotal));
    this.perPage$ = store.pipe(select(fromStore.getPerPage));
    this.from$ = store.pipe(select(fromStore.getFrom));
    this.to$ = store.pipe(select(fromStore.getTo));
    this.configTable = {
      dataKey: 'profile_id',
      cols: [
        { fields: ['profile_id'], header: 'Id', style: { width: '10%' } },
        { fields: ['profile_name'], header: 'Perfil', style: { width: '90%' } }
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() { }

  onLoad(profileSearch: SearchProfile) {
    this.store.dispatch(new fromStore.LoadEntity({
      profile: profileSearch.profile,
      limit: 20,
      page: 1
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
    this.store.dispatch(new fromStore.PaginateEntity(event.page + 1));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['profile']
    }));
  }

}
