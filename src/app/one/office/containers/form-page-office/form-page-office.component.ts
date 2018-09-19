import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Office } from './../../models/office.model';

@Component({
  selector: 'app-form-page-office',
  templateUrl: './form-page-office.component.html',
  styles: []
})
export class FormPageOfficeComponent implements OnInit {

  office$ = this.store.pipe(select(fromStore.getSelectedByRouter));

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  onStore(office: Office) {
    this.store.dispatch(new fromStore.StoreEntity(office));
  }

  onUpdate(office: Office) {
    this.store.dispatch(new fromStore.UpdateEntity(office));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['office']
    }));
  }

  onDestroy(office: Office) {
    this.store.dispatch(new fromStore.DestroyEntity(office));
  }
}
