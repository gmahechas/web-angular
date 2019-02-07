import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tree-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tree-shared.component.html',
  styles: []
})
export class TreeSharedComponent implements OnInit {

  @Input() value: any;
  @Input() selectionMode: string;
  @Output() select = new EventEmitter<any>();
  @Output() unSelect = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  nodeSelect(event) {
    this.select.emit(event.node);
  }

  nodeUnselect(event) {
    this.unSelect.emit(event.node);
  }
}
