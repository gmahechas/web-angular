import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-block-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './block-core.component.html',
  styles: []
})
export class BlockCoreComponent implements OnInit {

  @Input() blockedDocument = false;

  constructor() { }

  ngOnInit() {
  }

}
