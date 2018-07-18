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
  @Input() placeholder: string;
  @Output() keyUp: EventEmitter<string> = new EventEmitter<string>();
  @Output() handleChange: EventEmitter<any> = new EventEmitter<any>();

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

  setOption(value, option: string) {
    const splitOption = option.split('.');
    const optionsLength = splitOption.length;
    if (optionsLength === 1) {
      if (value[splitOption[0]]) {
        return value[splitOption[0]];
      } else {
        return option;
      }
    } else if (optionsLength === 2) {
      if (value[splitOption[0]][splitOption[1]]) {
        return value[splitOption[0]][splitOption[1]];
      } else {
        return option;
      }
    } else if (optionsLength === 3) {
      if (value[splitOption[0]][splitOption[1]][splitOption[2]]) {
        return value[splitOption[0]][splitOption[1]][splitOption[2]];
      } else {
        return option;
      }
    } else if (optionsLength === 4) {
      if (value[splitOption[0]][splitOption[1]][splitOption[2]][splitOption[3]]) {
        return value[splitOption[0]][splitOption[1]][splitOption[2]][splitOption[3]];
      } else {
        return option;
      }
    }
  }

  onChange(event) {
    this.handleChange.emit(event.value);
  }
}
