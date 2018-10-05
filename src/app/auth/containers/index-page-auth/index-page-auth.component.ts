import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/auth/store';

import { Auth } from '@web/app/auth/models/auth.model';

@Component({
  selector: 'app-index-page-auth',
  templateUrl: './index-page-auth.component.html',
  styles: []
})
export class IndexPageAuthComponent implements OnInit {

  pending$ = this.store.pipe(select(fromStore.getPending));
  error$ = this.store.pipe(select(fromStore.getError));

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  login(event: Auth) {
    this.store.dispatch(new fromStore.Login(event));
  }
}
