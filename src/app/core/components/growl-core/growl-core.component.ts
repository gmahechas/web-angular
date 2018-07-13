import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-growl-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './growl-core.component.html',
  styles: []
})
export class GrowlCoreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
