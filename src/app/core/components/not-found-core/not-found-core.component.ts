import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-not-found-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './not-found-core.component.html',
  styles: []
})
export class NotFoundCoreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
