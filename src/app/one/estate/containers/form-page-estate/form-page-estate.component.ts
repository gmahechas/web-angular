import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Estate } from './../../models/estate.model';
import { Country } from '../../../country/models/country.model';
import * as fromCountry from '../../../country/store';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-page-estate',
  templateUrl: './form-page-estate.component.html',
  styleUrls: ['./form-page-estate.component.scss']
})
export class FormPageEstateComponent implements OnInit {

  estate$: Observable<Estate>;
  countries$: Observable<Country[]>;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.estate$ = store.pipe(select(fromStore.getSelectedByRouter));
    this.countries$ = store.pipe(select(fromCountry.getAllEntities));
  }

  ngOnInit() {
  }

  onStore({ estate, country }) {
    this.store.dispatch(new fromStore.StoreEntity({ ...estate, country_id: country.country_id }));
  }

  onUpdate(estate: Estate) {
    this.store.dispatch(new fromStore.UpdateEntity(estate));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['estate']
    }));
  }

  onDestroy(estate: Estate) {
    this.store.dispatch(new fromStore.DestroyEntity(estate));
  }

  fromKeyUp(event) {
    this.store.dispatch(new fromCountry.LoadEntityShared({ country_name: event, country_code: '' }));
  }
}
