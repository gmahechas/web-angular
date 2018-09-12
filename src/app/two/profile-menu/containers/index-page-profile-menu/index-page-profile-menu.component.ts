import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';

import { ProfileMenu } from './../../models/profile-menu.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-index-page-profile-menu',
  templateUrl: './index-page-profile-menu.component.html',
  styles: []
})
export class IndexPageProfileMenuComponent implements OnInit {

  data$: Observable<ProfileMenu[]>;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.data$ = store.pipe(select(fromStore.getAllEntities));
  }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadEntity({
      profile: {
        profile_id: '1'
      }
    }));
  }

}
