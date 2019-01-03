import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromMacroproject from '@web/app/features/d/macroproject/store';
import * as fromCore from '@web/app/core/store';

import { Macroproject } from '@web/app/features/d/macroproject/models/macroproject.model';
import { SearchMacroproject } from '@web/app/features/d/macroproject/models/search-macroproject.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-macroproject',
  templateUrl: './index-page-macroproject.component.html',
  styles: []
})
export class IndexPageMacroprojectComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selected: any;

  query$ = this.store.pipe(select(fromMacroproject.getQuery), take(1));

  data$ = this.store.pipe(select(fromMacroproject.getAllEntities));
  total$ = this.store.pipe(select(fromMacroproject.getTotal));
  perPage$ = this.store.pipe(select(fromMacroproject.getPerPage));
  from$ = this.store.pipe(select(fromMacroproject.getFrom));
  to$ = this.store.pipe(select(fromMacroproject.getTo));
  configTable: any;

  constructor(
    private store: Store<fromMacroproject.State>
  ) {
    this.configTable = {
      dataKey: 'macroproject_id',
      cols: [
        { fields: ['macroproject_id'], header: ['macroproject.model.macroproject_id'], style: { width: '5%' } },
        { fields: ['macroproject_name'], header: ['macroproject.model.macroproject_name'], style: { width: '20%' } },
        { fields: ['macroproject_address'], header: ['macroproject.model.macroproject_address'], style: { width: '20%' } },
        { fields: ['macroproject_phone'], header: ['macroproject.model.macroproject_phone'], style: { width: '15%' } },
        { fields: ['city.city_name'], header: ['city.singular'], style: { width: '20%' } },
        { fields: ['office.office_name'], header: ['office.singular'], style: { width: '20%' } },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(fromMacroproject.getSelectedEntity), take(1)).subscribe(
      (macroproject: Macroproject) => {
        if (macroproject) {
          this.selected = macroproject;
          this.store.dispatch(new fromCore.Go({
            path: ['macroproject', macroproject.macroproject_id]
          }));
        }
      }
    );
  }

  onLoad(macroprojectSearch: SearchMacroproject) {
    this.store.dispatch(new fromMacroproject.LoadEntity({
      search: {
        macroproject: macroprojectSearch.macroproject,
        city: macroprojectSearch.city,
        office: macroprojectSearch.office,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromMacroproject.SelectEntity({ entity: null }));
    this.store.dispatch(new fromCore.Go({
      path: ['macroproject', 'create']
    }));
  }

  onEdit(macroproject: Macroproject) {
    this.store.dispatch(new fromMacroproject.SelectEntity({ entity: macroproject }));
    this.store.dispatch(new fromCore.Go({
      path: ['macroproject', macroproject.macroproject_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromMacroproject.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromMacroproject.SelectEntity({ entity: null }));
    this.store.dispatch(new fromCore.Go({
      path: ['macroproject']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromMacroproject.ResetSearch());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
