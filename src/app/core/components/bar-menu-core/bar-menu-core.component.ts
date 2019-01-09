import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { ParentChild } from '@web/app/core/models/parent-child.model';

@Component({
  selector: 'app-bar-menu-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bar-menu-core.component.html',
  styles: [`
    .selected_tim {
      background-color: #007ad9;
      color: #ffffff;
    }
  `]
})
export class BarMenuCoreComponent implements OnInit {

  @Input() bar: number;
  @Input() options: ParentChild[];
  @Input() selected: number;
  @Output() navigate: EventEmitter<{ bar: number, option: ParentChild }> = new EventEmitter<{ bar: number, option: ParentChild }>();

  constructor() { }

  ngOnInit() {
    /*     console.log(this.selected); */
  }

  handleNavigate(option: ParentChild) {
    this.navigate.emit({ bar: this.bar, option: option });
  }

}
