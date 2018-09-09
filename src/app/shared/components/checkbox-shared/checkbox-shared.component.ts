import { Component, OnInit, Input } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }
}
