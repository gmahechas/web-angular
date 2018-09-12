import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tree-shared',
  templateUrl: './tree-shared.component.html',
  styles: []
})
export class TreeSharedComponent implements OnInit {

  @Input() value: any;
  @Input() selectionMode: string;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() unSelect: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  nodeSelect(event) {
    this.select.emit(event.node);
  }

  onUnselect(event) {
    this.unSelect.emit(event.node);
  }
}
