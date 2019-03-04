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
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() entityId: any;
  @Input() data: any[];
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() filter: boolean;
  @Input() onlyShow: string;
  @Input() showClear: boolean;
  @Input() dropdownIcon: string;
  @Input() placeholder: string[];
  @Input() filterPlaceholder: string[];
  @Input() emptyFilterMessage: string[];
  @Input() searchByKeyUp: boolean;
  @Input() keyboardKey: string;
  @Input() keyUpTimes: number;
  @Output() keyUp = new EventEmitter<string>();
  @Output() handleChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onKeyUp(event) {
    if (this.searchByKeyUp) {
      const key = event.key;
      const value = event.target.value;

      if (value.length >= this.keyUpTimes) {
        if (key === this.keyboardKey) {
          this.keyUp.emit(value);
        } else if (this.keyboardKey === 'Any') {
          this.keyUp.emit(value);
        }
      }
    }
  }

  setOptions() {

    switch (this.onlyShow) {
      case 'store':
        return this.data;
      case 'store_form':
        if (this.group.get(this.controlName).value) {
          return [this.group.get(this.controlName).value].concat(this.data.filter(
            entity => entity[this.entityId] !== this.group.get(this.controlName).value[this.entityId]
          ));
        } else {
          return this.data;
        }
      case 'form': return [this.group.get(this.controlName).value];
    }
  }

  onChange(event) {
    this.handleChange.emit(event.value);
  }

}
