import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-panel-menu-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './panel-menu-core.component.html',
  styles: []
})
export class PanelMenuCoreComponent implements OnInit {

  @Input() menuItems: any;

  constructor() { }

  ngOnInit() {
  }

}
