import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-text-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input-text-shared.component.html',
  styles: []
})
export class InputTextSharedComponent implements OnInit {

  blockSpecial: RegExp = /^[^]+$/;

  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() keyFilter: string;
  @Input() toolTip: string;
  @Input() tooltipPosition: string;

  constructor() { }

  ngOnInit() {
  }

}
