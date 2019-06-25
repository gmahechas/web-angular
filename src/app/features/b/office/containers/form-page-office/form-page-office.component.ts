import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromOffice from '@web/app/features/b/office/store';
import * as fromCore from '@web/app/core/store';

import { Office } from '@web/app/features/b/office/models/office.model';
import { initialStateSelectedOffice } from '@web/app/features/b/office/models/selected-office.model';

@Component({
  selector: 'app-form-page-office',
  templateUrl: './form-page-office.component.html',
  styles: []
})
export class FormPageOfficeComponent implements OnInit {

  pending$ = this.store.pipe(select(fromOffice.getPending));
  office$ = this.store.pipe(select(fromOffice.getSelectedByRouter));

  constructor(
    private store: Store<fromOffice.State>
  ) { }

  ngOnInit() {
  }

  onStore(office: Office) {
    this.store.dispatch(fromOffice.EntityActions.StoreEntity({ entity: office }));
  }

  onUpdate(office: Office) {
    this.store.dispatch(fromOffice.EntityActions.UpdateEntity({ entity: office }));
  }

  onCancel() {
    this.store.dispatch(fromOffice.EntityActions.SetSelected({ selected: initialStateSelectedOffice }));
    this.store.dispatch(new fromCore.Go({
      path: ['office']
    }));
  }

  onDestroy(office: Office) {
    this.store.dispatch(fromOffice.EntityActions.DestroyEntity({ entity: office }));
  }

  onUserOffice(office: Office) {
    this.store.dispatch(fromOffice.EntityActions.SetSelected({
      selected: { gotoUserOffice: true, gotoOfficeDeparment: false }
    }));
    this.store.dispatch(new fromCore.Go({
      path: ['office', office.office_id, { outlets: { 'router-outlet-user-office': ['user-office', 'office', office.office_id] } }]
    }));
  }

  onOfficeDepartment(office: Office) {
    this.store.dispatch(fromOffice.EntityActions.SetSelected({
      selected: { gotoUserOffice: false, gotoOfficeDeparment: true }
    }));
    this.store.dispatch(new fromCore.Go({
      path: ['office', office.office_id, {
        outlets: { 'router-outlet-user-department': ['office-department', 'office', office.office_id] }
      }]
    }));
  }
}
