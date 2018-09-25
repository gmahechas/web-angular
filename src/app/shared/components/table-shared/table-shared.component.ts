import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-table-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-shared.component.html',
  styles: []
})
export class TableSharedComponent implements OnInit {

  @Input() data: any[];
  @Input() totalRecords: number;
  @Input() rows: number;
  @Input() first: number; // not used yet
  @Input() to: number; // not used yet
  @Input() configTable: any;
  @Output() rowSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowUnselect: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  onRowSelect(event) {
    this.rowSelect.emit(event.data);
  }

  onRowUnselect(event) {
    this.rowUnselect.emit(event.data);
  }

  onPageChange(event) {
    this.pageChange.emit(event);
  }
}
