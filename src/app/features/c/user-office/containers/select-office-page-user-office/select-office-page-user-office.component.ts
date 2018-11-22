import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';

@Component({
  selector: 'app-select-office-page-user-office',
  templateUrl: './select-office-page-user-office.component.html',
  styles: []
})
export class SelectOfficePageUserOfficeComponent implements OnInit {


  constructor(
    private store: Store<fromCore.State>
  ) { }

  ngOnInit() {
  }


}
