import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-input-mask-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input-mask-shared.component.html',
  styles: []
})
export class InputMaskSharedComponent implements OnInit {

  @Input() mask: string;

  constructor() { }

  ngOnInit() {
  }

}
