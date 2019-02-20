import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-dialog-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-shared.component.html',
  styles: []
})
export class DialogSharedComponent implements OnInit {

  @Input() display: boolean;
  @Input() modal: boolean;
  @Input() header: string;
  @Input() draggable: boolean;
  @Input() resizable: boolean;
  @Output() hide = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onHide() {
    this.hide.emit(false);
  }
}
