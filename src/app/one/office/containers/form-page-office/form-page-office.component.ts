import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Office } from './../../models/office.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-page-office',
  templateUrl: './form-page-office.component.html',
  styles: []
})
export class FormPageOfficeComponent implements OnInit {

  office$: Observable<Office>;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.office$ = store.pipe(select(fromStore.getSelectedByRouter));
  }

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
