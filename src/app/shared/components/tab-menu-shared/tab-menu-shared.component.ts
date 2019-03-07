import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab-menu-shared',
  templateUrl: './tab-menu-shared.component.html',
  styles: []
})
export class TabMenuSharedComponent implements OnInit {

  @Input() items: any;
  @Input() active: any;
  @Input() itemLabel: string;
  @Output() navigate = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClick(item) {
    this.navigate.emit(item);
  }

  onClose(event, index) {
    this.close.emit(index);
    event.preventDefault();
  }
}
