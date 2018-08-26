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

  setField(value, field: string) {
    const splitField = field.split('.');
    const fieldsLength = splitField.length;

    switch (fieldsLength) {
      case 1: return value[splitField[0]];
      case 2: return value[splitField[0]][splitField[1]];
      case 3: return value[splitField[0]][splitField[1]][splitField[2]];
      case 4: return value[splitField[0]][splitField[1]][splitField[2]][splitField[3]];
      default: return '';
    }
  }

}
