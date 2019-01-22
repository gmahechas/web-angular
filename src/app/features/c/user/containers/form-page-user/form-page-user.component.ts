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
    this.store.dispatch(new fromUser.StoreEntity({ entity: user }));
  }

  onUpdate(user: User) {
    this.store.dispatch(new fromUser.UpdateEntity({ entity: user }));
  }

  onCancel() {
    this.store.dispatch(new fromUser.SetSelected({ selected: initialStateSelectedUser }));
    this.store.dispatch(new fromCore.Go({
      path: ['user']
    }));
  }

  onDestroy(user: User) {
    this.store.dispatch(new fromUser.DestroyEntity({ entity: user }));
  }

  onUserOffice(user: User) {
    this.store.dispatch(new fromUser.SetSelected({ selected: { selectedEntity: user, gotoUserOffice: true } }));
    this.store.dispatch(new fromCore.Go({
      path: ['user', user.user_id, { outlets: { 'router-outlet-user': ['user-office', 'user', user.user_id] } }]
    }));
  }

}
