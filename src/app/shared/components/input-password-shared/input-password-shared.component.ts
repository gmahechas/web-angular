import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-password-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
