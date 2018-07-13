import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sidebar-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar-core.component.html',
  styles: []
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
