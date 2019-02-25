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

  @Input() options: ParentChild[];
  @Output() navigate = new EventEmitter<ProfileMenu>();
  bars: { bar: number, options: ParentChild[] }[] = [];

  constructor() { }

  ngOnInit() {
    this.bars.push({ bar: 0, options: this.options });
  }

  onNavigate(bar: number, option: ParentChild) {
    if (option.data.menu.menu_uri) {
      this.bars.splice((bar + 1), this.bars.length);
      this.navigate.emit(option.data);
    } else {
      this.bars.splice((bar + 1), this.bars.length);
      this.bars.push({ bar: this.bars.length, options: option.children });
    }
  }
}
