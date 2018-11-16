import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/c/user/store';
import * as fromCore from '@web/app/core/store';

import { User } from '@web/app/features/c/user/models/user.model';
import { SearchUser } from '@web/app/features/c/user/models/search-user.model';

@Component({
  selector: 'app-index-page-user',
  templateUrl: './index-page-user.component.html',
  styles: []
})
export class IndexPageUserComponent implements OnInit {

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
      dataKey: 'user_id',
      cols: [
        { fields: ['user_id'], header: ['user.model.user_id'], style: { 'width': '5%' } },
        { fields: ['username'], header: ['user.model.username'], style: { 'width': '20%' } },
        { fields: ['profile.profile_name'], header: ['profile.singular'], style: { 'width': '25%' } },
        { fields: ['email'], header: ['user.model.email'], style: { 'width': '50%' } },
        {
          fields: [
            'person.person_first_name',
            'person.person_second_name',
            'person.person_first_surname',
            'person.person_second_surname',
            'person.person_legal_name'
          ],
          header: ['person.singular'], style: { 'width': '50%' }
        },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() { }

  onLoad(userSearch: SearchUser) {
    this.store.dispatch(new fromStore.LoadEntity({
      search: {
        user: userSearch.user,
        person: userSearch.person,
        profile: userSearch.profile,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromCore.Go({
      path: ['user', 'create']
    }));
  }

  onEdit(user: User) {
    this.store.dispatch(new fromCore.Go({
      path: ['user', user.user_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromStore.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['user']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromStore.ResetSearch());
  }
}
