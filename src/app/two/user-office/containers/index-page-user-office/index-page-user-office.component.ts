import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromUser from '../../../user/store';

import { User } from '../../../user/models';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-user-office',
  templateUrl: './index-page-user-office.component.html',
  styles: []
})
export class IndexPageUserOfficeComponent implements OnInit {

  subscription: Subscription;
  data$ = this.store.pipe(select(fromStore.getAllEntities));

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
    this.subscription = this.store.pipe(
      select(fromUser.getSelectedByRouter),
      filter(entity => entity !== undefined)
    ).subscribe(
      (user: User) => {
        this.store.dispatch(new fromStore.LoadEntity({
          search: {
            user: {
              user_id: String(user.user_id)
            }
          }
        }));
      }
    );

  }

}
