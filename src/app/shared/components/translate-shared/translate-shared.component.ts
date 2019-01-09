import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-translate-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './translate-shared.component.html',
  styles: []
})
export class TranslateSharedComponent implements OnInit {

  @Input() strings: string[];
  @Input() lowerCase: boolean;
  @Input() titleCase: boolean;
  @Input() upperCase: boolean;

  constructor() { }

  ngOnInit() {
  }

}
