import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromCountry from '@web/app/features/a/country/store';
import * as fromCore from '@web/app/core/store';

import { Country } from '@web/app/features/a/country/models/country.model';
import { SearchCountry } from '@web/app/features/a/country/models/search-country.model';

@Component({
  selector: 'app-index-page-country',
  templateUrl: './index-page-country.component.html',
  styles: []
})
export class IndexPageCountryComponent implements OnInit {

  query$ = this.store.pipe(select(fromCountry.getQuery));

  data$ = this.store.pipe(select(fromCountry.getAllEntities));
  total$ = this.store.pipe(select(fromCountry.getTotal));
  perPage$ = this.store.pipe(select(fromCountry.getPerPage));
  from$ = this.store.pipe(select(fromCountry.getFrom));
  to$ = this.store.pipe(select(fromCountry.getTo));
  configTable: any;

  constructor(
    private store: Store<fromCountry.State>
  ) {
    this.configTable = {
      dataKey: 'country_id',
      cols: [
        { fields: ['country_id'], header: ['country.model.country_id'], style: { width: '10%' } },
        { fields: ['country_name'], header: ['country.model.country_name'], style: { width: '70%' } },
        { fields: ['country_code'], header: ['country.model.country_code'], style: { width: '20%' } },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() { }

  onLoad(countrySearch: SearchCountry) {
    this.store.dispatch(new fromCountry.LoadEntity({ search: { country: countrySearch.country, limit: 20, page: 1 } }));
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
    this.store.dispatch(new fromCountry.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['country']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromCountry.ResetSearch());
  }
}
