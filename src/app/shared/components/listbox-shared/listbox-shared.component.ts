import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-listbox-shared',
  templateUrl: './listbox-shared.component.html',
  styles: []
})
export class ListboxSharedComponent implements OnInit {

  @Input() options: any;
  @Input() optionLabel: string;
  @Output() handleClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClick(event) {
    this.handleClick.emit(event.value);
  }
}
