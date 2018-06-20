import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-shared.component.html',
  styleUrls: ['./dropdown-shared.component.scss']
})
export class DropdownSharedComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() configDropDown: any;
  @Input() data: any[];
  @Output() keyUp: EventEmitter<string> = new EventEmitter<string>();
  search = false;

  constructor() { }

  ngOnInit() {
  }

  onKeyUp(event) {
    this.search = true;
    this.keyUp.emit(event.target.value);
  }

}
