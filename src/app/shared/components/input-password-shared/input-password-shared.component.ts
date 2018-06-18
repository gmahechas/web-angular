import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-password-shared',
  templateUrl: './input-password-shared.component.html',
  styleUrls: ['./input-password-shared.component.scss']
})
export class InputPasswordSharedComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() placeholder: string;

  constructor() { }

  ngOnInit() {
  }

}
