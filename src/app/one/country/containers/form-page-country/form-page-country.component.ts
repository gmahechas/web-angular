import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Country } from './../../models/country.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-page-country',
  templateUrl: './form-page-country.component.html',
  styleUrls: ['./form-page-country.component.scss']
})
export class FormPageCountryComponent implements OnInit {

  country$: Observable<Country>;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.country$ = store.pipe(select(fromStore.getSelectedByRouter));
  }

  ngOnInit() {
  }

  onStore(country: Country) {
    this.store.dispatch(new fromStore.StoreEntity(country));
  }

  onUpdate(country: Country) {
    this.store.dispatch(new fromStore.UpdateEntity(country));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['country']
    }));
  }

  onDestroy(country: Country) {
    this.store.dispatch(new fromStore.DestroyEntity(country));
  }
}
