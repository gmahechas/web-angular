import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from './../../store';

import { Auth } from './../../models/auth.model';

@Component({
  selector: 'app-index-page-auth',
  templateUrl: './index-page-auth.component.html',
  styleUrls: ['./index-page-auth.component.scss']
})
export class IndexPageAuthComponent implements OnInit {

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  login($event: Auth) {
    this.store.dispatch(new fromStore.Login($event));
  }
}
