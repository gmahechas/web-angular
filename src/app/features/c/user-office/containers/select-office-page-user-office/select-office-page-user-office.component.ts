import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromAuth from '@web/app/auth/store';

@Component({
  selector: 'app-select-office-page-user-office',
  templateUrl: './select-office-page-user-office.component.html',
  styles: []
})
export class SelectOfficePageUserOfficeComponent implements OnInit {

  user$ = this.store.pipe(select(fromAuth.getUser));
  office$ = this.store.pipe(select(fromCore.getOffice));

  constructor(
    private store: Store<fromCore.State>
  ) { }

  ngOnInit() {
  }


}
