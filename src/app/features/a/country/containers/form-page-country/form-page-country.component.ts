import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/a/country/store';
import * as fromCore from '@web/app/core/store';

import { Country } from '@web/app/features/a/country/models/country.model';

@Component({
  selector: 'app-form-page-country',
  templateUrl: './form-page-country.component.html',
  styles: []
})
export class FormPageCountryComponent implements OnInit {

  pending$ = this.store.pipe(select(fromStore.getPending));
  country$ = this.store.pipe(select(fromStore.getSelectedByRouter));

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  onStore(country: Country) {
    this.store.dispatch(new fromStore.StoreEntity({ entity: country }));
  }

  onUpdate(country: Country) {
    this.store.dispatch(new fromStore.UpdateEntity({ entity: country }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['country']
    }));
  }

  onDestroy(country: Country) {
    this.store.dispatch(new fromStore.DestroyEntity({ entity: country }));
  }
}