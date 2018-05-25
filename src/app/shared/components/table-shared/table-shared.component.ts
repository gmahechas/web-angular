import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-table-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-shared.component.html',
  styleUrls: ['./table-shared.component.scss']
})
export class TableSharedComponent implements OnInit {

  @Input() configTable: any;
  @Input() data: any[];
  @Output() rowSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowUnselect: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onRowSelect(event) {
    this.rowSelect.emit(event.data);
  }

  onRowUnselect(event) {
    this.rowUnselect.emit(event.data);
  }

}
