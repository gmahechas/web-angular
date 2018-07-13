import { Country } from './../../../country/models/country.model';
import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Estate } from './../../models/estate.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-page-estate',
  templateUrl: './form-page-estate.component.html',
  styles: []
})
export class FormPageEstateComponent implements OnInit {

  estate$: Observable<Estate>;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.estate$ = store.pipe(select(fromStore.getSelectedByRouter));
  }

  ngOnInit() {
  }

  onStore({ estate, country }: { estate: Estate, country: Country }) {
    this.store.dispatch(new fromStore.StoreEntity({ ...estate, country_id: country.country_id }));
  }

  onUpdate({ estate, country }: { estate: Estate, country: Country }) {
    this.store.dispatch(new fromStore.UpdateEntity({ ...estate, country: country, country_id: country.country_id }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['estate']
    }));
  }

  onDestroy(estate: Estate) {
    this.store.dispatch(new fromStore.DestroyEntity(estate));
  }

}
