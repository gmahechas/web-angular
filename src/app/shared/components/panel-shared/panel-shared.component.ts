import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-panel-shared',
  templateUrl: './panel-shared.component.html',
  styleUrls: ['./panel-shared.component.scss']
})
export class PanelSharedComponent implements OnInit {

  @Input() header: string;

  constructor() { }

  ngOnInit() {
  }

}
