import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-shared.component.html',
  styles: []
})
export class DropdownSharedComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() configDropDown: any;
  @Input() data: any[];
  @Input() options: string[];
  @Output() keyUp: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onKeyUp(event) {
    this.keyUp.emit(event.target.value);
  }

  setOptions() {
    if (this.group.get(this.controlName).value) {
      return [this.group.get(this.controlName).value].concat(this.data.filter(
        entity => entity[this.configDropDown.dataKey] !== this.group.get(this.controlName).value[this.configDropDown.dataKey]
      ));
    } else {
      return this.data;
    }

  }
}
