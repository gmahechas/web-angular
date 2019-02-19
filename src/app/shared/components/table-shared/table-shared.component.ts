import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-table-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-shared.component.html',
  styles: []
})
export class TableSharedComponent implements OnInit {

  selectedRows: any;
  @Input() data: any[];
  @Input() totalRecords: number;
  @Input() rows: number;
  @Input() first: number; // not used yet
  @Input() to: number; // not used yet
  @Input() set selectRows(rows: any) {
    if (rows) {
      this.selectedRows = rows;
    }
  }
  @Input() configTable: any;
  @Input() topPaginator = false;
  @Input() footerPaginator = false;
  @Input() caption = false;
  @Input() footer = false;
  @Input() summary = false;
  @Output() rowSelect = new EventEmitter<any>();
  @Output() rowUnselect = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<any>();
  @Output() columnSelected = new EventEmitter<any>();

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

  onColumnSelection(column, event) {
    this.columnSelected.emit({ column, event });
  }
}
