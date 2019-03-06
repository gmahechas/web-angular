import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromProfileMenu from '@web/app/features/c/profile-menu/store';

@Component({
  selector: 'app-index-page-profile-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './index-page-profile-menu.component.html',
  styles: []
})
export class IndexPageProfileMenuComponent implements OnInit, OnDestroy {

  data$ = this.store.pipe(select(fromProfileMenu.getAllEntities));

  constructor(
    private store: Store<fromProfileMenu.State>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(new fromProfileMenu.LoadEntity({
        search: {
          profile: {
            profile_id: this.route.snapshot.params.profile_id
          }
        }
      }));
    });

  }

  onSelect(event) {
  }

  onUnSelect(event) {
  }

  ngOnDestroy() {
    this.store.dispatch(new fromProfileMenu.Reset({ redirect: true }));
  }
}
