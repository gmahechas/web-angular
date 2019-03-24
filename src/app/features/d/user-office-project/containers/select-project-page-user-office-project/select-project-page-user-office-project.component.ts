import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';

@Component({
  selector: 'app-select-project-page-user-office-project',
  templateUrl: './select-project-page-user-office-project.component.html',
  styles: []
})
export class SelectProjectPageUserOfficeProjectComponent implements OnInit {

  userOffice$ = this.store.pipe(select(fromCore.getUserOffice));

  constructor(
    private store: Store<fromCore.State>
  ) { }

  ngOnInit() {
  }

  selectUserOfficeProject(userOfficeProject) {
    this.store.dispatch(new fromCore.SetUserOfficeProject({ userOfficeProject, redirect: true }));
  }
}
