import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';

import { Company } from '@web/app/features/b/company/models/company.model';
import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';
import { UserOfficeProject } from '@web/app/features/d/user-office-project/models/user-office-project.model';
import { User } from '@web/app/features/c/user/models';
import { ProfileMenu } from '@web/app/features/c/profile-menu/models';
import { SelectedMenus } from '@web/app/core/models/selected-menus.model';

@Component({
  selector: 'app-header-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header-core.component.html',
  styles: []
})
export class HeaderCoreComponent implements OnInit {

  @Input() company: Company;
  @Input() userOffice: UserOffice;
  @Input() userOfficeProject: UserOfficeProject;
  @Input() user: any;
  @Input() sideBar: boolean;
  @Input() selectedMenus: SelectedMenus;
  @Output() clickOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickSelectOffice: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickSelectProject: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickLogout: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() handleHide: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() handleNavigate: EventEmitter<ProfileMenu> = new EventEmitter<ProfileMenu>();
  @Output() removeTabMenu: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  handlerClick(event) {
    this.clickOpen.emit(event);
  }

  selectOffice() {
    this.clickSelectOffice.emit(true);
  }

  selectProject() {
    this.clickSelectProject.emit(true);
  }

  logout() {
    this.clickLogout.emit(true);
  }

  closeSidebar(event) {
    this.handleHide.emit(event);
  }

  nav(profileMenu: ProfileMenu) {
    this.handleNavigate.emit(profileMenu);
  }

  removeMenuTab(index: number) {
    this.removeTabMenu.emit(index);
  }
}
