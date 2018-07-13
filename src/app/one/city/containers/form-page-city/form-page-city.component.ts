import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { City } from './../../models/city.model';
import { Estate } from './../../../estate/models/estate.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-page-city',
  templateUrl: './form-page-city.component.html',
  styles: []
})
export class FormPageCityComponent implements OnInit {

  city$: Observable<City>;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.city$ = store.pipe(select(fromStore.getSelectedByRouter));
  }

  ngOnInit() {
  }

  onStore({ city, estate }: { city: City, estate: Estate}) {
    this.store.dispatch(new fromStore.StoreEntity({...city, estate_id: estate.estate_id}));
  }

  onUpdate({ city, estate }: { city: City, estate: Estate}) {
    this.store.dispatch(new fromStore.UpdateEntity({...city, estate_id: estate.estate_id}));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['city']
    }));
  }

  onDestroy(city: City) {
    this.store.dispatch(new fromStore.DestroyEntity(city));
  }
}
