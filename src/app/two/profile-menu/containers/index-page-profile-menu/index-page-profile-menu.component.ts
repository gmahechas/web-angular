import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';

@Component({
  selector: 'app-index-page-profile-menu',
  templateUrl: './index-page-profile-menu.component.html',
  styles: []
})
export class IndexPageProfileMenuComponent implements OnInit {

  data$ = this.store.pipe(select(fromStore.getAllEntities));

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadEntity({
      profile: {
        profile_id: '1'
      }
    }));
  }

}
