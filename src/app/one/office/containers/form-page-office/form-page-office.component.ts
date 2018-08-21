import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Office } from './../../models/office.model';
import { City } from './../../../city/models/city.model';

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

  onStore({ office, city }: { office: Office, city: City }) {
    this.store.dispatch(new fromStore.StoreEntity({...office, city_id: city.city_id }));
  }

  onUpdate({ office, city }: { office: Office, city: City }) {
    this.store.dispatch(new fromStore.UpdateEntity({...office, city_id: city.city_id }));
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
