import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromCountry from '@web/app/features/a/country/store';
import * as fromCore from '@web/app/core/store';

import { Country } from '@web/app/features/a/country/models/country.model';
import { SearchCountry } from '@web/app/features/a/country/models/search-country.model';
import { SelectedCountry, initialStateSelectedCountry } from '@web/app/features/a/country/models/selected-country.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-country',
  templateUrl: './index-page-country.component.html',
  styles: []
})
export class IndexPageCountryComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selectedEntity: Country;

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
        { fields: ['country_id'], header: ['country.model.country_id'], style: { width: '5%' } },
        { fields: ['country_name'], header: ['country.model.country_name'], style: { width: '70%' } },
        { fields: ['country_code'], header: ['country.model.country_code'], style: { width: '25%' } },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(fromCountry.getSelected), take(1)).subscribe(
      (selected: SelectedCountry) => {
        if (selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(fromCore.RouterActions.Go({
            path: ['country', selected.selectedEntity.country_id]
          }));
        }
      }
    );
  }

  onLoad(countrySearch: SearchCountry) {
    this.store.dispatch(fromCountry.EntityActions.LoadEntity({
      search: {
        ...countrySearch,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(fromCountry.EntityActions.SetSelected({ selected: initialStateSelectedCountry }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['country', 'create']
    }));
  }

  onEdit(country: Country) {
    this.store.dispatch(fromCountry.EntityActions.SetSelected({ selected: { selectedEntity: country } }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['country', country.country_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(fromCountry.EntityActions.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(fromCountry.EntityActions.SetSelected({ selected: initialStateSelectedCountry }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['country']
    }));
  }

  onResetSearch() {
    this.store.dispatch(fromCountry.EntityActions.Reset({ redirect: true }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
