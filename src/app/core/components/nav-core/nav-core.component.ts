import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav-core.component.html',
  styleUrls: ['./nav-core.component.scss']
})
export class NavCoreComponent implements OnInit {

  @Input() menuItems: any[];
  @Input() showSidenav = false;
  @Output() hide: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() { }

  onHide() {
    this.hide.emit(false);
  }

  toggle(event) {
    console.log(event);
  }
}
