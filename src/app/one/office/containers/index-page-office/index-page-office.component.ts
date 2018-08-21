import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Office } from './../../models/office.model';
import { SearchOffice } from './../../models/search-office.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-index-page-office',
  templateUrl: './index-page-office.component.html',
  styles: []
})
export class IndexPageOfficeComponent implements OnInit {

  query$: Observable<SearchOffice>;

  data$: Observable<Office[]>;
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
      dataKey: 'office_id',
      cols: [
        { field: 'office_id', header: 'Id', style: { 'width': '30%' } },
        { field: 'office_name', header: 'Oficina', style: { 'width': '35%' } },
        { field: 'city.city_name', header: 'Ciudad', style: { 'width': '35%' } },
      ]
    };
  }

  ngOnInit() { }

  onLoad(officeSearch: SearchOffice) {
    this.store.dispatch(new fromStore.LoadEntity({
      office: officeSearch.office,
      city: officeSearch.city,
      limit: 20,
      page: 1
    }));
  }

  onCreate() {
    this.store.dispatch(new fromCore.Go({
      path: ['office', 'create']
    }));
  }

  onEdit(office: Office) {
    this.store.dispatch(new fromCore.Go({
      path: ['office', office.office_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromStore.PaginateEntity(event.page + 1));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['office']
    }));
  }

}
