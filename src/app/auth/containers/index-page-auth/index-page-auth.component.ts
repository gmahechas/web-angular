import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromAuth from '@web/app/auth/store';

import { Auth } from '@web/app/auth/models/auth.model';

@Component({
  selector: 'app-index-page-auth',
  templateUrl: './index-page-auth.component.html',
  styles: []
})
export class IndexPageAuthComponent implements OnInit {

  pending$ = this.store.pipe(select(fromAuth.getPending));
  error$ = this.store.pipe(select(fromAuth.getError));

  constructor(
    private store: Store<fromAuth.State>
  ) { }

  ngOnInit() {
  }

  login(auth: Auth) {
    this.store.dispatch(fromAuth.AuthActions.Auth({ auth }));
  }
}
