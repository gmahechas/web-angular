import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Country } from './../../models/country.model';
import { SearchCountry } from './../../models/search-country.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-index-page-country',
  templateUrl: './index-page-country.component.html',
  styleUrls: ['./index-page-country.component.scss']
})
export class IndexPageCountryComponent implements OnInit {

  countries$: Observable<Country[]>;
  query$: Observable<SearchCountry>;
  configTable: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.countries$ = store.pipe(select(fromStore.getAllEntities));
    this.query$ = store.pipe(select(fromStore.getQuery));
    this.configTable = {
      dataKey: 'country_id',
      cols: [
        { field: 'country_id', header: 'Id', style: { width: '10%' } },
        { field: 'country_name', header: 'Pais', style: { width: '70%' } },
        { field: 'country_code', header: 'Codigo', style: { width: '20%' } },
      ]
    };
  }

  ngOnInit() { }

  onLoad(countrySearch: SearchCountry) {
    this.store.dispatch(new fromStore.EntityLoad(countrySearch));
  }

  onCreate() {
    this.store.dispatch(new fromCore.Go({
      path: ['country', 'create'],
      /* extras: { skipLocationChange: true } */
    }));
  }

  onEdit(country: Country) {
    this.store.dispatch(new fromCore.Go({
      path: ['country', country.country_id],
      /* extras: { skipLocationChange: true } */
    }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['country']
    }));
  }

}
