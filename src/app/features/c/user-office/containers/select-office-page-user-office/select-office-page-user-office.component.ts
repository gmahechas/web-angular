import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromAuthSelectors from '@web/app/auth/store/selectors';

@Component({
  selector: 'app-select-office-page-user-office',
  templateUrl: './select-office-page-user-office.component.html',
  styles: []
})
export class SelectOfficePageUserOfficeComponent implements OnInit {

  user$ = this.store.pipe(select(fromAuthSelectors.getUser));

  constructor(
    private store: Store<fromCore.State>
  ) { }

  ngOnInit() {
  }

  selectUserOffice(userOffice) {
    this.store.dispatch(new fromCore.SetUserOffice({ userOffice, redirect: true }));
  }

}
