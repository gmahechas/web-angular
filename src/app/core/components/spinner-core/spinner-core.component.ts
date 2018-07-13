import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-spinner-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './spinner-core.component.html',
  styles: []
})
export class SpinnerCoreComponent implements OnInit {

  @Input() showSpinner = false;

  constructor() { }

  ngOnInit() {
  }

}
