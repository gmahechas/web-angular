import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromCore from './../../../../core/store';

@Component({
  selector: 'app-index-page-state',
  templateUrl: './index-page-state.component.html',
  styleUrls: ['./index-page-state.component.scss']
})
export class IndexPageStateComponent implements OnInit {

  constructor(
    private store: Store<fromCore.State>
  ) { }

  ngOnInit() {
  }

}
