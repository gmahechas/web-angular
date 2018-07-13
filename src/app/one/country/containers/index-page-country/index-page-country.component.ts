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
  styles: []
})
export class IndexPageCountryComponent implements OnInit {

  query$: Observable<SearchCountry>;

  data$: Observable<Country[]>;
  total$: Observable<number>;
  perPage$: Observable<number>;
  from$: Observable<number>;
  to$: Observable<number>;
  configTable: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.data$ = store.pipe(select(fromStore.getAllEntities));
    this.query$ = store.pipe(select(fromStore.getQuery));
    this.total$ = store.pipe(select(fromStore.getTotal));
    this.perPage$ = store.pipe(select(fromStore.getPerPage));
    this.from$ = store.pipe(select(fromStore.getFrom));
    this.to$ = store.pipe(select(fromStore.getTo));
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
    this.store.dispatch(new fromStore.LoadEntity({ country: countrySearch.country, limit: 20, page: 1 }));
  }

  onCreate() {
    this.store.dispatch(new fromCore.Go({
      path: ['country', 'create']
    }));
  }

  onEdit(country: Country) {
    this.store.dispatch(new fromCore.Go({
      path: ['country', country.country_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromStore.PaginateEntity(event.page + 1));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['country']
    }));
  }

}
