import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromDay from '@web/app/features/f/day/store';
import * as fromCore from '@web/app/core/store';

import { Day } from '@web/app/features/f/day/models/day.model';
import { SearchDay } from '@web/app/features/f/day/models/search-day.model';
import { SelectedDay, initialStateSelectedDay } from '@web/app/features/f/day/models/selected-day.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-day',
  templateUrl: './index-page-day.component.html',
  styles: []
})
export class IndexPageDayComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selectedEntity: Day;

  query$ = this.store.pipe(select(fromDay.getQuery, take(1)));

  data$ = this.store.pipe(select(fromDay.getAllEntities));
  total$ = this.store.pipe(select(fromDay.getTotal));
  perPage$ = this.store.pipe(select(fromDay.getPerPage));
  from$ = this.store.pipe(select(fromDay.getFrom));
  to$ = this.store.pipe(select(fromDay.getTo));
  configTable: any;

  constructor(
    private store: Store<fromDay.State>
  ) {
    this.configTable = {
      dataKey: 'day_id',
      cols: [
        // TODO
      ]
    };
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(fromDay.getSelected), take(1)).subscribe(
      (selected: SelectedDay) => {
        if (selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(fromCore.RouterActions.Go({
            path: ['day', selected.selectedEntity.day_id]
          }));
        }
      }
    );
  }

  onLoad(daySearch: SearchDay) {
    this.store.dispatch(fromDay.EntityActions.LoadEntity({
      search: {
        ...daySearch,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(fromDay.EntityActions.SetSelected({ selected: initialStateSelectedDay }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['day', 'create']
    }));
  }

  onEdit(day: Day) {
    this.store.dispatch(fromDay.EntityActions.SetSelected({ selected: { selectedEntity: day } }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['day', day.day_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(fromDay.EntityActions.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(fromDay.EntityActions.SetSelected({ selected: initialStateSelectedDay }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['day']
    }));
  }

  onResetSearch() {
    this.store.dispatch(fromDay.EntityActions.Reset({ redirect: true }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
