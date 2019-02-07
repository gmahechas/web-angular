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

  bars: { bar: number, options: ParentChild[] }[] = [];
  @Input() options: ParentChild[];
  @Output() navigate = new EventEmitter<ProfileMenu>();

  constructor() { }

  ngOnInit() {
    this.bars.push({ bar: 0, options: this.options });
  }

  onNavigate(option: { bar: number, option: ParentChild }) {
    if (option.option.data.menu.menu_uri) {
      this.bars.splice((option.bar + 1), this.bars.length);
      this.navigate.emit(option.option.data);
    } else {
      this.bars.splice((option.bar + 1), this.bars.length);
      this.bars.push({ bar: this.bars.length, options: option.option.children });
    }
  }
}
