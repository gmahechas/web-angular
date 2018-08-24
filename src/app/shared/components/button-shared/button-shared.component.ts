import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-button-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-shared.component.html',
  styles: []
})
export class ButtonSharedComponent implements OnInit {

  @Input() type: string;
  @Input() label: string;
  @Input() icon: string;
  @Input() iconPos: string;
  @Input() disabled: boolean;
  @Input() class: string;

  constructor() { }

  ngOnInit() {
  }
}
