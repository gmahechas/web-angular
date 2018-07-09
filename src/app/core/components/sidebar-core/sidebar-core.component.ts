import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-core',
  templateUrl: './sidebar-core.component.html',
  styleUrls: ['./sidebar-core.component.scss']
})
export class SidebarCoreComponent implements OnInit {

  @Input() menuItems: any;
  @Input() showSidebar: boolean;
  @Output() hide: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onHide() {
    this.hide.emit(false);
  }
}
