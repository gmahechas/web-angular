import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-message-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './message-core.component.html',
  styles: []
})
export class MessageCoreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
