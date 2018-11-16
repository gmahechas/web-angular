import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/core/store';
import * as fromAuth from '@web/app/auth/store';

import { ProfileMenu } from '@web/app/features/c/profile-menu/models';

@Component({
  selector: 'app-index-page-core',
  templateUrl: './index-page-core.component.html',
  styles: []
})
export class IndexPageCoreComponent implements OnInit {

  user$ = this.store.pipe(select(fromAuth.getUser));
  company$ = this.store.pipe(select(fromAuth.getCompany));
  showSidebar = this.store.pipe(select(fromStore.getShowSidebar));
  blockedDocument$ = this.store.pipe(select(fromStore.getBlockedDocument));
  showSpinner$ = this.store.pipe(select(fromStore.getShowSpinner));
  progressBar$ = this.store.pipe(select(fromStore.getProgressBar));

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  opencloseSidebar(event: boolean) {
    if (event) {
      this.store.dispatch(new fromStore.OpenSidebar());
    } else if (!event) {
      this.store.dispatch(new fromStore.CloseSidebar());
    }
  }

  handleNavigate(profileMenu: ProfileMenu) {
    this.store.dispatch(new fromStore.Go({ path: [profileMenu.menu.menu_uri] }));
    this.store.dispatch(new fromStore.CloseSidebar());
  }

  handleLogout($event) {
    this.store.dispatch(new fromAuth.LogoutAuth());
  }

  changeLang(lang) {
    this.store.dispatch(new fromStore.ChangeLang({ lang }));
  }
}
