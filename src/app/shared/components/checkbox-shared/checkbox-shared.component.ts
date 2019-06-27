import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-shared',
  templateUrl: './checkbox-shared.component.html',
  styles: []
})
export class CheckboxSharedComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() checked: boolean;
  @Input() binary: boolean;
  @Input() label: string;
  @Output() handleChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onChange() {
    this.handleChange.emit(this.checked);
  }
}
