import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-icon-prime-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon-prime-shared.component.html',
  styles: []
})
export class IconPrimeSharedComponent implements OnInit {

  @Input() class: string;

  constructor() { }

  ngOnInit() {
  }

}
