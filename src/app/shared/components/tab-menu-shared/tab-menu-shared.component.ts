import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab-menu-shared',
  templateUrl: './tab-menu-shared.component.html',
  styles: []
})
export class TabMenuSharedComponent implements OnInit {

  @Input() items: any;

  constructor() { }

  ngOnInit() {
  }

}
