import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromAuth from '@web/app/auth/store';

import { ProfileMenu } from '@web/app/features/c/profile-menu/models';
import { Menu } from '@web/app/features/c/menu/models/menu.model';

@Component({
  selector: 'app-header-core',
  templateUrl: './header-core.component.html',
  styles: []
})
export class HeaderCoreComponent implements OnInit {

  showSidebar$ = this.store.pipe(select(fromCore.getShowSidebar));
  user$ = this.store.pipe(select(fromAuth.getUser));
  company$ = this.store.pipe(select(fromCore.getCompany));
  userOffice$ = this.store.pipe(select(fromCore.getUserOffice));
  userOfficeProject$ = this.store.pipe(select(fromCore.getUserOfficeProject));
  selectedMenus$ = this.store.pipe(select(fromCore.getSelectedMenus));

  constructor(
    private store: Store<fromCore.State>
  ) { }

  ngOnInit() {
  }

  opencloseSidebar(event: boolean) {
    this.store.dispatch(new fromCore.OpenCloseSidebar({ showSidebar: event }));
  }

  gotoSelectOffice() {
    this.store.dispatch(new fromCore.Go({ path: ['user-office', 'select-office'] }));
  }

  gotoSelectProject() {
    this.store.dispatch(new fromCore.Go({ path: ['user-office-project', 'select-project'] }));
  }

  handleNavigateFromSide(profileMenu: ProfileMenu) {
    this.store.dispatch(new fromCore.AddSelectedMenu({ menu: profileMenu.menu }));
    this.store.dispatch(new fromCore.Go({ path: [profileMenu.menu.menu_uri] }));
    this.store.dispatch(new fromCore.OpenCloseSidebar({ showSidebar: false }));
  }

  handleNavigateFromTab(menu: Menu) {
    this.store.dispatch(new fromCore.ChangeSelectedMenu({ menu }));
    this.store.dispatch(new fromCore.Go({ path: [menu.menu_uri] }));
  }

  removeMenuTab(index: number) {
    this.store.dispatch(new fromCore.RemoveSelectedMenu({ index }));
  }

  logout() {
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
}
