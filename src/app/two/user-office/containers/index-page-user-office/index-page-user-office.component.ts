import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromUser from '../../../user/store';
import * as fromOffice from '../../../../one/office/store';

import { User } from '../../../user/models';
import { Office } from './../../../../one/office/models/office.model';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-user-office',
  templateUrl: './index-page-user-office.component.html',
  styles: []
})
export class IndexPageUserOfficeComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  data$ = this.store.pipe(select(fromStore.getAllEntities));

  constructor(
    private store: Store<fromStore.State>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.snapshot.paramMap.keys.forEach(key => {
      switch (key) {
        case 'user_id': {
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
          break;
        }
        case 'office_id': {
          this.subscription = this.store.pipe(
            select(fromOffice.getSelectedByRouter),
            filter(entity => entity !== undefined)
          ).subscribe(
            (office: Office) => {
              this.store.dispatch(new fromStore.LoadEntity({
                search: {
                  office: {
                    office_id: String(office.office_id)
                  }
                }
              }));
            }
          );
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
