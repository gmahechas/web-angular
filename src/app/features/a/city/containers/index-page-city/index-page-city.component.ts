import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromCity from '@web/app/features/a/city/store';
import * as fromCore from '@web/app/core/store';

import { City } from '@web/app/features/a/city/models/city.model';
import { SearchCity } from '@web/app/features/a/city/models/search-city.model';
import { SelectedCity, initialStateSelectedCity } from '@web/app/features/a/city/models/selected-city.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-city',
  templateUrl: './index-page-city.component.html',
  styles: []
})
export class IndexPageCityComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selectedEntity: City;

  query$ = this.store.pipe(select(fromCity.getQuery));

  data$ = this.store.pipe(select(fromCity.getAllEntities));
  total$ = this.store.pipe(select(fromCity.getTotal));
  perPage$ = this.store.pipe(select(fromCity.getPerPage));
  from$ = this.store.pipe(select(fromCity.getFrom));
  to$ = this.store.pipe(select(fromCity.getTo));
  configTable: any;

  constructor(
    private store: Store<fromCity.State>
  ) {
    this.configTable = {
      dataKey: 'city_id',
      cols: [
        { fields: ['city_id'], header: ['city.model.city_id'], style: { width: '5%' } },
        { fields: ['city_name'], header: ['city.model.city_name'], style: { width: '30%' } },
        { fields: ['city_code'], header: ['city.model.city_code'], style: { width: '10%' } },
        { fields: ['estate.estate_name'], header: ['estate.singular'], style: { width: '30%' } },
        { fields: ['estate.country.country_name'], header: ['country.singular'], style: { width: '25%' } }
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(fromCity.getSelected), take(1)).subscribe(
      (selected: SelectedCity) => {
        if (selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(fromCore.RouterActions.Go({
            path: ['city', selected.selectedEntity.city_id]
          }));
        }
      }
    );
  }

  onLoad(citySearch: SearchCity) {
    this.store.dispatch(fromCity.EntityActions.LoadEntity({
      search: {
        ...citySearch,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(fromCity.EntityActions.SetSelected({ selected: initialStateSelectedCity }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['city', 'create']
    }));
  }

  onEdit(city: City) {
    this.store.dispatch(fromCity.EntityActions.SetSelected({ selected: { selectedEntity: city } }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['city', city.city_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(fromCity.EntityActions.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(fromCity.EntityActions.SetSelected({ selected: initialStateSelectedCity }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['city']
    }));
  }

  onResetSearch() {
    this.store.dispatch(fromCity.EntityActions.Reset({ redirect: true }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
