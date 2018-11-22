import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromOffice from '@web/app/features/b/office/store';
import * as fromCore from '@web/app/core/store';

import { Office } from '@web/app/features/b/office/models/office.model';

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
    this.store.dispatch(new fromOffice.StoreEntity({ entity: office }));
  }

  onUpdate(office: Office) {
    this.store.dispatch(new fromOffice.UpdateEntity({ entity: office }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['office']
    }));
  }

  onDestroy(office: Office) {
    this.store.dispatch(new fromOffice.DestroyEntity({ entity: office }));
  }

  onUserOffice(office: Office) {
    this.store.dispatch(new fromCore.Go({
      path: ['office', office.office_id, { outlets: { 'router-outlet-user-office': ['user-office', 'office', office.office_id] } }]
    }));
  }

}
