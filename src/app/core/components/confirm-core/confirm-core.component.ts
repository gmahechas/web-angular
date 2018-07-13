import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-confirm-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confirm-core.component.html',
  styles: []
})
export class ConfirmCoreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
