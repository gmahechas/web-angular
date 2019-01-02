import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromEstate from '@web/app/features/a/estate/store';
import * as fromCore from '@web/app/core/store';

import { Estate } from '@web/app/features/a/estate/models/estate.model';
import { SearchEstate } from '@web/app/features/a/estate/models/search-estate.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-estate',
  templateUrl: './index-page-estate.component.html',
  styles: []
})
export class IndexPageEstateComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selected: any;

  query$ = this.store.pipe(select(fromEstate.getQuery));

  data$ = this.store.pipe(select(fromEstate.getAllEntities));
  total$ = this.store.pipe(select(fromEstate.getTotal));
  perPage$ = this.store.pipe(select(fromEstate.getPerPage));
  from$ = this.store.pipe(select(fromEstate.getFrom));
  to$ = this.store.pipe(select(fromEstate.getTo));
  configTable: any;

  constructor(
    private store: Store<fromEstate.State>
  ) {
    this.configTable = {
      dataKey: 'estate_id',
      cols: [
        { fields: ['estate_id'], header: ['estate.model.estate_id'], style: { width: '5%' } },
        { fields: ['estate_name'], header: ['estate.model.estate_name'], style: { width: '40%' } },
        { fields: ['estate_code'], header: ['estate.model.estate_code'], style: { width: '15%' } },
        { fields: ['country.country_name'], header: ['country.singular'], style: { width: '40%' } }
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(fromEstate.getSelectedEntity), take(1)).subscribe(
      (estate: Estate) => {
        if (estate) {
          this.selected = estate;
          this.store.dispatch(new fromCore.Go({
            path: ['estate', estate.estate_id]
          }));
        }
      }
    );
  }

  onLoad(estateSearch: SearchEstate) {
    this.store.dispatch(new fromEstate.LoadEntity({
      search: {
        estate: estateSearch.estate,
        country: estateSearch.country,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromEstate.SelectEntity({ entity: null }));
    this.store.dispatch(new fromCore.Go({
      path: ['estate', 'create']
    }));
  }

  onEdit(estate: Estate) {
    this.store.dispatch(new fromEstate.SelectEntity({ entity: estate }));
    this.store.dispatch(new fromCore.Go({
      path: ['estate', estate.estate_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromEstate.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromEstate.SelectEntity({ entity: null }));
    this.store.dispatch(new fromCore.Go({
      path: ['estate']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromEstate.ResetSearch());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
