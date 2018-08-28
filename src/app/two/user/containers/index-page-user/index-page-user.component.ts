import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { User } from './../../models/user.model';
import { SearchUser } from './../../models/search-user.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-index-page-user',
  templateUrl: './index-page-user.component.html',
  styles: []
})
export class IndexPageUserComponent implements OnInit {

  query$: Observable<SearchUser>;

  data$: Observable<User[]>;
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
      dataKey: 'user_id',
      cols: [
        { fields: ['user_id'], header: 'Id', style: { 'width': '5%' } },
        { fields: ['username'], header: 'Usuario', style: { 'width': '45%' } },
        { fields: ['email'], header: 'Correo', style: { 'width': '50%' } },
        {
          fields: [
            'person.person_first_name',
            'person.person_second_name',
            'person.person_first_surname',
            'person.person_second_surname'
          ],
          header: 'Correo', style: { 'width': '50%' }
        },
      ]
    };
  }

  ngOnInit() { }

  onLoad(userSearch: SearchUser) {
    this.store.dispatch(new fromStore.LoadEntity({
      user: userSearch.user,
      person: userSearch.person,
      profile: userSearch.profile,
      limit: 20,
      page: 1
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
    this.store.dispatch(new fromStore.PaginateEntity(event.page + 1));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['user']
    }));
  }

}
