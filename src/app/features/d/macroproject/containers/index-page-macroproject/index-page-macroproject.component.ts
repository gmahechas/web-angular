import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromMacroproject from '@web/app/features/d/macroproject/store';
import * as fromCore from '@web/app/core/store';

import { Macroproject } from '@web/app/features/d/macroproject/models/macroproject.model';
import { SearchMacroproject } from '@web/app/features/d/macroproject/models/search-macroproject.model';
import {
  SelectedMacroproject,
  initialStateSelectedMacroproject
} from '@web/app/features/d/macroproject/models/selected-macroproject.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-macroproject',
  templateUrl: './index-page-macroproject.component.html',
  styles: []
})
export class IndexPageMacroprojectComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selectedEntity: Macroproject;

  query$ = this.store.pipe(select(fromMacroproject.getQuery));

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
    this.subscription = this.store.pipe(select(fromMacroproject.getSelected), take(1)).subscribe(
      (selected: SelectedMacroproject) => {
        if (selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(fromCore.RouterActions.Go({
            path: ['macroproject', selected.selectedEntity.macroproject_id]
          }));
        }
      }
    );
  }

  onLoad(macroprojectSearch: SearchMacroproject) {
    this.store.dispatch(fromMacroproject.EntityActions.LoadEntity({
      search: {
        ...macroprojectSearch,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(fromMacroproject.EntityActions.SetSelected({ selected: initialStateSelectedMacroproject }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['macroproject', 'create']
    }));
  }

  onEdit(macroproject: Macroproject) {
    this.store.dispatch(fromMacroproject.EntityActions.SetSelected({
      selected: { ...initialStateSelectedMacroproject, selectedEntity: macroproject }
    }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['macroproject', macroproject.macroproject_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(fromMacroproject.EntityActions.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(fromMacroproject.EntityActions.SetSelected({ selected: initialStateSelectedMacroproject }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['macroproject']
    }));
  }

  onResetSearch() {
    this.store.dispatch(fromMacroproject.EntityActions.Reset({ redirect: true }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
