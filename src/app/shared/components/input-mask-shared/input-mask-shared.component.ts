import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-mask-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input-mask-shared.component.html',
  styles: []
})
export class InputMaskSharedComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() placeholder: string;
  @Input() mask: string;

  constructor() { }

  ngOnInit() {
  }

}
