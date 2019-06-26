import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromUser from '@web/app/features/c/user/store';
import * as fromCore from '@web/app/core/store';

import { User } from '@web/app/features/c/user/models/user.model';
import { initialStateSelectedUser } from '@web/app/features/c/user/models/selected-user.model';

@Component({
  selector: 'app-form-page-user',
  templateUrl: './form-page-user.component.html',
  styles: []
})
export class FormPageUserComponent implements OnInit {

  pending$ = this.store.pipe(select(fromUser.getPending));
  user$ = this.store.pipe(select(fromUser.getSelectedByRouter));

  constructor(
    private store: Store<fromUser.State>
  ) { }

  ngOnInit() {
  }

  onStore(user: User) {
    this.store.dispatch(fromUser.EntityActions.StoreEntity({ entity: user }));
  }

  onUpdate(user: User) {
    this.store.dispatch(fromUser.EntityActions.UpdateEntity({ entity: user }));
  }

  onCancel() {
    this.store.dispatch(fromUser.EntityActions.SetSelected({ selected: initialStateSelectedUser }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['user']
    }));
  }

  onDestroy(user: User) {
    this.store.dispatch(fromUser.EntityActions.DestroyEntity({ entity: user }));
  }

  onUserOffice(user: User) {
    this.store.dispatch(fromUser.EntityActions.SetSelected({ selected: { gotoUserOffice: true } }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['user', user.user_id, { outlets: { 'router-outlet-user-office': ['user-office', 'user', user.user_id] } }]
    }));
  }

}
