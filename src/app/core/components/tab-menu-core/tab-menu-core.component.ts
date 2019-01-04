import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProfileMenu } from '@web/app/features/c/profile-menu/models/profile-menu.model';

@Component({
  selector: 'app-tab-menu-core',
  templateUrl: './tab-menu-core.component.html',
  styles: []
})
export class TabMenuCoreComponent implements OnInit {

  @Input() profileMenus: ProfileMenu[];
  @Output() navigate: EventEmitter<ProfileMenu> = new EventEmitter<ProfileMenu>();

  constructor() { }

  ngOnInit() {
  }

  onClick(profile_menu: ProfileMenu) {
    this.navigate.emit(profile_menu);
  }
}
