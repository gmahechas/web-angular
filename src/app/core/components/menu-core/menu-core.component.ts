import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { ProfileMenu } from '@web/app/features/c/profile-menu/models/profile-menu.model';
import { ParentChild } from '@web/app/core/models/parent-child.model';

@Component({
  selector: 'app-menu-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu-core.component.html',
  styles: []
})
export class MenuCoreComponent implements OnInit {

  bars: { bar: number, selected: number | null, options: ParentChild[] }[] = [];
  @Input() options: ParentChild[];
  @Output() navigate: EventEmitter<ProfileMenu> = new EventEmitter<ProfileMenu>();

  constructor() { }

  ngOnInit() {
    this.bars.push({ bar: 0, selected: null, options: this.options });
  }

  onNavigate(option: { bar: number, option: ParentChild }) {
    if (option.option.data.menu.menu_uri) {
      if (option.option.data.profile_menu_id === '1') {
        this.bars.splice((option.bar + 1), this.bars.length);
      }
      this.bars[option.bar].selected = option.option.data.profile_menu_id;
      this.navigate.emit(option.option.data);
    } else {
      this.bars.splice((option.bar + 1), this.bars.length);
      this.bars[option.bar].selected = option.option.data.profile_menu_id;
      this.bars.push({ bar: this.bars.length, selected: null, options: option.option.children });
    }
  }
}
