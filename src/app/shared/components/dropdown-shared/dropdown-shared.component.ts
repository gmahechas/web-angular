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
  @Input() entityId: any;
  @Input() data: any[];
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() placeholder: string;
  @Input() filterPlaceholder: string;
  @Output() keyUp: EventEmitter<string> = new EventEmitter<string>();
  @Output() handleChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onKeyUp(event) {
    const key = event.target.value;

    if (key.length >= 3) {
      this.keyUp.emit(event.target.value);
    }
  }

  setOptions() {
    if (this.group.get(this.controlName).value) {
      return [this.group.get(this.controlName).value].concat(this.data.filter(
        entity => entity[this.entityId] !== this.group.get(this.controlName).value[this.entityId]
      ));
    } else {
      return this.data;
    }
  }

  onChange(event) {
    this.handleChange.emit(event.value);
  }
}
