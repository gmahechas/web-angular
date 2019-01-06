import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromCity from '@web/app/features/a/city/store';
import * as fromCore from '@web/app/core/store';

import { City } from '@web/app/features/a/city/models/city.model';
import { initialStateSelectedCity } from '@web/app/features/a/city/models/selected-city.model';

@Component({
  selector: 'app-form-page-city',
  templateUrl: './form-page-city.component.html',
  styles: []
})
export class FormPageCityComponent implements OnInit {

  pending$ = this.store.pipe(select(fromCity.getPending));
  city$ = this.store.pipe(select(fromCity.getSelectedByRouter));

  constructor(
    private store: Store<fromCity.State>
  ) { }

  ngOnInit() {
  }

  onStore(city: City) {
    this.store.dispatch(new fromCity.StoreEntity({ entity: city }));
  }

  onUpdate(city: City) {
    this.store.dispatch(new fromCity.UpdateEntity({ entity: city }));
  }

  onCancel() {
    this.store.dispatch(new fromCity.SetSelected({ selected: initialStateSelectedCity }));
    this.store.dispatch(new fromCore.Go({
      path: ['city']
    }));
  }

  onDestroy(city: City) {
    this.store.dispatch(new fromCity.DestroyEntity({ entity: city }));
  }
}
