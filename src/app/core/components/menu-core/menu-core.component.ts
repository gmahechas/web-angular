import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Profile } from '@web/app/two/profile/models/profile.model';
import { ProfileMenu } from '@web/app/two/profile-menu/models';

@Component({
  selector: 'app-menu-core',
  templateUrl: './menu-core.component.html',
  styles: []
})
export class MenuCoreComponent implements OnInit {

  @Input() profile: Profile;
  @Output() navigate: EventEmitter<ProfileMenu> = new EventEmitter<ProfileMenu>();

  constructor() { }

  ngOnInit() {
  }

  onNavigate(profileMenu: ProfileMenu) {
    this.navigate.emit(profileMenu);
  }
}
