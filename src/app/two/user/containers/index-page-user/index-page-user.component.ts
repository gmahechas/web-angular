import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { User } from './../../models/user.model';
import { SearchUser } from './../../models/search-user.model';

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
        { fields: ['user_id'], header: 'Id', style: { 'width': '5%' } },
        { fields: ['username'], header: 'Usuario', style: { 'width': '20%' } },
        { fields: ['profile.profile_name'], header: 'Usuario', style: { 'width': '25%' } },
        { fields: ['email'], header: 'Correo', style: { 'width': '50%' } },
        {
          fields: [
            'person.person_first_name',
            'person.person_second_name',
            'person.person_first_surname',
            'person.person_second_surname',
            'person.person_legal_name'
          ],
          header: 'Persona', style: { 'width': '50%' }
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
