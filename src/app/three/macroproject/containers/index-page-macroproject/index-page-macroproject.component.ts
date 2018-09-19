import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Macroproject } from './../../models/macroproject.model';
import { SearchMacroproject } from './../../models/search-macroproject.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-index-page-macroproject',
  templateUrl: './index-page-macroproject.component.html',
  styles: []
})
export class IndexPageMacroprojectComponent implements OnInit {

  query$: Observable<SearchMacroproject>;

  data$: Observable<Macroproject[]>;
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
      dataKey: 'macroproject_id',
      cols: [
        { fields: ['macroproject_id'], header: 'Id', style: { 'width': '5%' } },
        { fields: ['macroproject_name'], header: 'Macro Proyecto', style: { 'width': '20%' } },
        { fields: ['macroproject_address'], header: 'Direccion', style: { 'width': '20%' } },
        { fields: ['macroproject_phone'], header: 'Direccion', style: { 'width': '15%' } },
        { fields: ['city.city_name'], header: 'Ciudad', style: { 'width': '20%' } },
        { fields: ['office.office_name'], header: 'Oficina', style: { 'width': '20%' } },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() { }

  onLoad(macroprojectSearch: SearchMacroproject) {
    this.store.dispatch(new fromStore.LoadEntity({
      macroproject: macroprojectSearch.macroproject,
      city: macroprojectSearch.city,
      office: macroprojectSearch.office,
      limit: 20,
      page: 1
    }));
  }

  onCreate() {
    this.store.dispatch(new fromCore.Go({
      path: ['macroproject', 'create']
    }));
  }

  onEdit(macroproject: Macroproject) {
    this.store.dispatch(new fromCore.Go({
      path: ['macroproject', macroproject.macroproject_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromStore.PaginateEntity(event.page + 1));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['macroproject']
    }));
  }

}