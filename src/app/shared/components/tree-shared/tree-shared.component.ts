import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tree-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tree-shared.component.html',
  styles: []
})
export class TreeSharedComponent implements OnChanges, OnInit {

  @Input() value: any;
  @Input() selectionMode: string;
  @Output() handleSelect = new EventEmitter<any>();
  @Output() unSelect = new EventEmitter<any>();
  selectedNodes: any[] = [];

  constructor() { }

  ngOnChanges() {
    if (this.value.length > 0) {
      this.selectedNodes.push(this.value[0]);
      this.selectedNodes.push(this.value[1]);
      this.selectedNodes.push(this.value[1].children[0]);
    }
  }

  ngOnInit() {
  }

  nodeSelect(event) {
    this.handleSelect.emit(event.node);
  }

  nodeUnselect(event) {
    this.unSelect.emit(event.node);
  }
}
