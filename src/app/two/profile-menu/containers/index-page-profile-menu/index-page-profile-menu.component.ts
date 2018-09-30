import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';

@Component({
  selector: 'app-index-page-profile-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './index-page-profile-menu.component.html',
  styles: []
})
export class IndexPageProfileMenuComponent implements OnInit {

  data$ = this.store.pipe(select(fromStore.getAllEntities));

  constructor(
    private store: Store<fromStore.State>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadEntity({
      search: {
        profile: {
          profile_id: this.route.snapshot.params.profile_id
        }
      }
    }));
  }
}
