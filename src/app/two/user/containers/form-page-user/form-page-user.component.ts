import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { User } from './../../models/user.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-page-user',
  templateUrl: './form-page-user.component.html',
  styles: []
})
export class FormPageUserComponent implements OnInit {

  user$: Observable<User>;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.user$ = store.pipe(select(fromStore.getSelectedByRouter));
  }

  ngOnInit() {
  }

  onStore(user: User) {
    this.store.dispatch(new fromStore.StoreEntity(user));
  }

  onUpdate(user: User) {
    this.store.dispatch(new fromStore.UpdateEntity(user));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['user']
    }));
  }

  onDestroy(user: User) {
    this.store.dispatch(new fromStore.DestroyEntity(user));
  }
}
