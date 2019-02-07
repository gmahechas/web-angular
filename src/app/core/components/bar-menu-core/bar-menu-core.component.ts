import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { ParentChild } from '@web/app/core/models/parent-child.model';

@Component({
  selector: 'app-bar-menu-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bar-menu-core.component.html',
  styles: []
})
export class BarMenuCoreComponent implements OnInit {

  @Input() bar: number;
  @Input() options: ParentChild[];
  @Output() navigate = new EventEmitter<{ bar: number, option: ParentChild }>();

  constructor() { }

  ngOnInit() {
  }

  handleNavigate(option: ParentChild) {
    this.navigate.emit({ bar: this.bar, option });
  }

}
