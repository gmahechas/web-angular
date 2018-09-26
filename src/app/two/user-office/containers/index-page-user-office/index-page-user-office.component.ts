import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';

@Component({
  selector: 'app-index-page-user-office',
  templateUrl: './index-page-user-office.component.html',
  styles: []
})
export class IndexPageUserOfficeComponent implements OnInit {

  data$ = this.store.pipe(select(fromStore.getAllEntities));

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadEntity({
      search: {
        user: {
          user_id: '1'
        }
      }
    }));
  }

}
