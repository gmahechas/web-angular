import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { User } from './../../models/user.model';

@Component({
  selector: 'app-form-page-user',
  templateUrl: './form-page-user.component.html',
  styles: []
})
export class FormPageUserComponent implements OnInit {

  user$ = this.store.pipe(select(fromStore.getSelectedByRouter));

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  onStore(user: User) {
    this.store.dispatch(new fromStore.StoreEntity({ entity: user }));
  }

  onUpdate(user: User) {
    this.store.dispatch(new fromStore.UpdateEntity({ entity: user }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['user']
    }));
  }

  onDestroy(user: User) {
    this.store.dispatch(new fromStore.DestroyEntity({ entity: user }));
  }

  onUserOffice(user: User) {
    this.store.dispatch(new fromCore.Go({
      path: ['user', user.user_id, { outlets: { 'router-outlet-user-office': ['user-office', 'user', user.user_id] } }]
    }));
  }

}
