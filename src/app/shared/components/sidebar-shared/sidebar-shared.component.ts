import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sidebar-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar-shared.component.html',
  styles: []
})
export class SidebarSharedComponent implements OnInit {

  @Input() showSidebar: boolean;
  @Input() position: string;
  @Output() hide: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onHide() {
    this.hide.emit(false);
  }
}
