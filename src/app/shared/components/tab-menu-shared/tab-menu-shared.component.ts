import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab-menu-shared',
  templateUrl: './tab-menu-shared.component.html',
  styles: []
})
export class TabMenuSharedComponent implements OnInit {

  @Input() active: any;
  @Input() items: any;
  @Output() navigate: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

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
