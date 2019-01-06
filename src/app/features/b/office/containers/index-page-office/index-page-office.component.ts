import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromOffice from '@web/app/features/b/office/store';
import * as fromCore from '@web/app/core/store';

import { Office } from '@web/app/features/b/office/models/office.model';
import { SearchOffice } from '@web/app/features/b/office/models/search-office.model';
import { initialStateSelectedOffice } from '@web/app/features/b/office/models/selected-office.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-office',
  templateUrl: './index-page-office.component.html',
  styles: []
})
export class IndexPageOfficeComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selectedEntity: Office;

  query$ = this.store.pipe(select(fromOffice.getQuery), take(1));

  data$ = this.store.pipe(select(fromOffice.getAllEntities));
  total$ = this.store.pipe(select(fromOffice.getTotal));
  perPage$ = this.store.pipe(select(fromOffice.getPerPage));
  from$ = this.store.pipe(select(fromOffice.getFrom));
  to$ = this.store.pipe(select(fromOffice.getTo));
  configTable: any;

  constructor(
    private store: Store<fromOffice.State>
  ) {
    this.configTable = {
      dataKey: 'office_id',
      cols: [
        { fields: ['office_id'], header: ['office.model.office_id'], style: { width: '5%' } },
        { fields: ['office_name'], header: ['office.model.office_name'], style: { width: '50%' } },
        { fields: ['city.city_name'], header: ['city.singular'], style: { width: '45%' } },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(fromOffice.getSelected), take(1)).subscribe(
      (selected: { selectedEntity: Office | null, gotoUserOffice: boolean }) => {
        if (selected.gotoUserOffice && selected.selectedEntity) {
          this.store.dispatch(new fromCore.Go({
            path: [
              'office',
              selected.selectedEntity.office_id,
              { outlets: { 'router-outlet-user-office': ['user-office', 'office', selected.selectedEntity.office_id] } }
            ]
          }));
        } else if (selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(new fromCore.Go({
            path: ['office', selected.selectedEntity.office_id]
          }));
        }
      }
    );
  }

  onLoad(officeSearch: SearchOffice) {
    this.store.dispatch(new fromOffice.LoadEntity({
      search: {
        office: officeSearch.office,
        city: officeSearch.city,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromOffice.SetSelected({ selected: initialStateSelectedOffice }));
    this.store.dispatch(new fromCore.Go({
      path: ['office', 'create']
    }));
  }

  onEdit(office: Office) {
    this.store.dispatch(new fromOffice.SetSelected({ selected: { ...initialStateSelectedOffice, selectedEntity: office } }));
    this.store.dispatch(new fromCore.Go({
      path: ['office', office.office_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromOffice.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromOffice.SetSelected({ selected: initialStateSelectedOffice }));
    this.store.dispatch(new fromCore.Go({
      path: ['office']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromOffice.ResetSearch());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
