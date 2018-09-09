import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-switch-shared',
  templateUrl: './input-switch-shared.component.html',
  styles: []
})
export class InputSwitchSharedComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;

  constructor() { }

  ngOnInit() {
  }

}
