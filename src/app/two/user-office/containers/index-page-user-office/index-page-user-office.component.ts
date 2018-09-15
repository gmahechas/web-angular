import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';

import { UserOffice } from './../../models/user-office.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-index-page-user-office',
  templateUrl: './index-page-user-office.component.html',
  styles: []
})
export class IndexPageUserOfficeComponent implements OnInit {

  data$: Observable<UserOffice[]>;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.data$ = store.pipe(select(fromStore.getAllEntities));
  }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadEntity({
      user: {
        user_id: '1'
      }
    }));
  }

}
