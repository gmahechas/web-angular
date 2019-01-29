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
  company$ = this.store.pipe(select(fromCore.getCompany));
  userOffice$ = this.store.pipe(select(fromCore.getUserOffice));
  userOfficeProject$ = this.store.pipe(select(fromCore.getUserOfficeProject));
  showSidebar = this.store.pipe(select(fromCore.getShowSidebar));
  blockedDocument$ = this.store.pipe(select(fromCore.getBlockedDocument));
  showSpinner$ = this.store.pipe(select(fromCore.getShowSpinner));
  progressBar$ = this.store.pipe(select(fromCore.getProgressBar));
  selectedMenus$ = this.store.pipe(select(fromCore.getSelectedMenus));

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

  handleNavigateFromSide(profileMenu: ProfileMenu) {
    this.store.dispatch(new fromCore.AddSelectedMenu({ profile_menu: profileMenu }));
    this.store.dispatch(new fromCore.Go({ path: [profileMenu.menu.menu_uri] }));
    this.store.dispatch(new fromCore.CloseSidebar());
  }

  handleNavigateFromTab(profileMenu: ProfileMenu) {
    this.store.dispatch(new fromCore.ChangeSelectedMenu({ profile_menu: profileMenu }));
    this.store.dispatch(new fromCore.Go({ path: [profileMenu.menu.menu_uri] }));
  }

  removeMenuFromTab(index: number) {
    this.store.dispatch(new fromCore.RemoveSelectedMenu({ index }));
  }

  handleLogout(event) {
    this.store.dispatch(new fromCore.ConfirmDialog({
      confirm: {
        acceptType: fromAuth.AuthActionTypes.LogoutAuth,
        acceptLabel: 'salir',
        rejectLabel: 'cancelar',
        header: 'salir',
        message: 'realmente desea salir del sistema'
      }
    }));
  }

  gotoSelectOffice(event) {
    this.store.dispatch(new fromCore.Go({ path: ['user-office', 'select-office'] }));
  }

  gotoSelectProject(event) {
    this.store.dispatch(new fromCore.Go({ path: ['user-office-project', 'select-project'] }));
  }

  changeLang(lang) {
    this.store.dispatch(new fromCore.ChangeLang({ lang }));
  }
}
