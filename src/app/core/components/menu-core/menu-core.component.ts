import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-core',
  templateUrl: './menu-core.component.html',
  styles: []
})
export class MenuCoreComponent implements OnInit {

  @Input() menuItems: any;

  constructor() { }

  ngOnInit() {
  }

}
