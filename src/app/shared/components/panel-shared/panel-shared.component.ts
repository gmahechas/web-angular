import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-panel-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './panel-shared.component.html',
  styleUrls: ['./panel-shared.component.scss']
})
export class PanelSharedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
