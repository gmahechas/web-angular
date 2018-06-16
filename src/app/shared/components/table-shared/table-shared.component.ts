import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-table-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-shared.component.html',
  styleUrls: ['./table-shared.component.scss']
})
export class TableSharedComponent implements OnInit {

  @Input() data: any[];
  @Input() rows: number;
  @Input() totalRecords: number;
  @Input() first: number;
  @Input() to: number;
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
