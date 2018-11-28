import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
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
  userOffice$ = this.store.pipe(select(fromCore.getUserOffice));
  showSidebar = this.store.pipe(select(fromCore.getShowSidebar));
  blockedDocument$ = this.store.pipe(select(fromCore.getBlockedDocument));
  showSpinner$ = this.store.pipe(select(fromCore.getShowSpinner));
  progressBar$ = this.store.pipe(select(fromCore.getProgressBar));

  constructor(
    private store: Store<fromCore.State>
  ) { }

  ngOnInit() {
  }

  opencloseSidebar(event: boolean) {
    if (event) {
      this.store.dispatch(new fromCore.OpenSidebar());
    } else if (!event) {
      this.store.dispatch(new fromCore.CloseSidebar());
    }
  }

  handleNavigate(profileMenu: ProfileMenu) {
    this.store.dispatch(new fromCore.Go({ path: [profileMenu.menu.menu_uri] }));
    this.store.dispatch(new fromCore.CloseSidebar());
  }

  handleLogout($event) {
    this.store.dispatch(new fromAuth.LogoutAuth());
  }

  gotoSelectOffice() {
    this.store.dispatch(new fromCore.Go({ path: ['user-office', 'select-office'] }));
  }

  changeLang(lang) {
    this.store.dispatch(new fromCore.ChangeLang({ lang }));
  }
}
