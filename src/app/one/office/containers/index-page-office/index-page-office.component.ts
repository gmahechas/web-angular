import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/one/office/store';
import * as fromCore from '@web/app/core/store';

import { Office } from '@web/app/one/office/models/office.model';
import { SearchOffice } from '@web/app/one/office/models/search-office.model';

@Component({
  selector: 'app-index-page-office',
  templateUrl: './index-page-office.component.html',
  styles: []
})
export class IndexPageOfficeComponent implements OnInit {

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
      dataKey: 'office_id',
      cols: [
        { fields: ['office_id'], header: 'Id', style: { 'width': '30%' } },
        { fields: ['office_name'], header: 'Sucursal', style: { 'width': '35%' } },
        { fields: ['city.city_name'], header: 'Ciudad', style: { 'width': '35%' } },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() { }

  onLoad(officeSearch: SearchOffice) {
    this.store.dispatch(new fromStore.LoadEntity({
      search: {
        office: officeSearch.office,
        city: officeSearch.city,
        limit: 20,
        page: 1
      }
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
    this.store.dispatch(new fromStore.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['office']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromStore.ResetSearch());
  }
}
