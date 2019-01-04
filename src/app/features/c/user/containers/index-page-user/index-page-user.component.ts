import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromUser from '@web/app/features/c/user/store';
import * as fromCore from '@web/app/core/store';

import { User } from '@web/app/features/c/user/models/user.model';
import { SearchUser } from '@web/app/features/c/user/models/search-user.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-user',
  templateUrl: './index-page-user.component.html',
  styles: []
})
export class IndexPageUserComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selectedEntity: User;

  query$ = this.store.pipe(select(fromUser.getQuery), take(1));

  data$ = this.store.pipe(select(fromUser.getAllEntities));
  total$ = this.store.pipe(select(fromUser.getTotal));
  perPage$ = this.store.pipe(select(fromUser.getPerPage));
  from$ = this.store.pipe(select(fromUser.getFrom));
  to$ = this.store.pipe(select(fromUser.getTo));
  configTable: any;

  constructor(
    private store: Store<fromUser.State>
  ) {
    this.configTable = {
      dataKey: 'user_id',
      cols: [
        { fields: ['user_id'], header: ['user.model.user_id'], style: { width: '5%' } },
        { fields: ['username'], header: ['user.model.username'], style: { width: '20%' } },
        { fields: ['profile.profile_name'], header: ['profile.singular'], style: { width: '25%' } },
        { fields: ['email'], header: ['user.model.email'], style: { width: '50%' } },
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

  ngOnInit() {
    this.subscription = this.store.pipe(select(fromUser.getSelected), take(1)).subscribe(
      (selected: { selectedEntity: User | null }) => {
        if (selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(new fromCore.Go({
            path: ['user', selected.selectedEntity.user_id]
          }));
        }
      }
    );
  }

  onLoad(userSearch: SearchUser) {
    this.store.dispatch(new fromUser.LoadEntity({
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
    this.store.dispatch(new fromUser.SelectEntity({ entity: null }));
    this.store.dispatch(new fromCore.Go({
      path: ['user', 'create']
    }));
  }

  onEdit(user: User) {
    this.store.dispatch(new fromUser.SelectEntity({ entity: user }));
    this.store.dispatch(new fromCore.Go({
      path: ['user', user.user_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromUser.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromUser.SelectEntity({ entity: null }));
    this.store.dispatch(new fromCore.Go({
      path: ['user']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromUser.ResetSearch());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
