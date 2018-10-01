import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Estate } from './../../models/estate.model';
import { SearchEstate } from './../../models/search-estate.model';

@Component({
  selector: 'app-index-page-estate',
  templateUrl: './index-page-estate.component.html',
  styles: []
})
export class IndexPageEstateComponent implements OnInit {

  query$ = this.store.pipe(select(fromStore.getQuery));

  data$ = this.store.pipe(select(fromStore.getAllEntities));
  total$ = this.store.pipe(select(fromStore.getTotal));
  perPage$ = this.store.pipe(select(fromStore.getPerPage));
  from$ = this.store.pipe(select(fromStore.getFrom));
  to$ = this.store.pipe(select(fromStore.getTo));
  configTable: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.configTable = {
      dataKey: 'estate_id',
      cols: [
        { fields: ['estate_id'], header: 'Id', style: { 'width': '10%' } },
        { fields: ['estate_name'], header: 'Estado', style: { 'width': '40%' } },
        { fields: ['estate_code'], header: 'Codigo', style: { 'width': '10%' } },
        { fields: ['country.country_name'], header: 'Pais', style: { 'width': '40%' } }
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() { }

  onLoad(estateSearch: SearchEstate) {
    this.store.dispatch(new fromStore.LoadEntity({
      search: {
        estate: estateSearch.estate,
        country: estateSearch.country,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromCore.Go({
      path: ['estate', 'create']
    }));
  }

  onEdit(estate: Estate) {
    this.store.dispatch(new fromCore.Go({
      path: ['estate', estate.estate_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromStore.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['estate']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromStore.ResetSearch());
  }
}
