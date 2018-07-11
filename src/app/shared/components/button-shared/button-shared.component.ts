import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-shared',
  templateUrl: './button-shared.component.html',
  styleUrls: ['./button-shared.component.scss']
})
export class ButtonSharedComponent implements OnInit {

  @Input() type: string;
  @Input() label: string;
  @Input() disabled: boolean;
  @Input() class: string;

  constructor() { }

  ngOnInit() {
  }
}
