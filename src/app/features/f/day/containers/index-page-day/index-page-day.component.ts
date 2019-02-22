import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromDay from '@web/app/features/f/day/store';
import * as fromCore from '@web/app/core/store';

import { Day } from '@web/app/features/f/day/models/day.model';
import { SearchDay } from '@web/app/features/f/day/models/search-day.model';
import { initialStateSelectedDay } from '@web/app/features/f/day/models/selected-day.model';

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
      (selected: { selectedEntity: Day | null }) => {
        if (selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(new fromCore.Go({
            path: ['day', selected.selectedEntity.day_id]
          }));
        }
      }
    );
  }

  onLoad(daySearch: SearchDay) {
    this.store.dispatch(new fromDay.LoadEntity({
      search: {
        day: daySearch.day,
        // TODO
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromDay.SetSelected({ selected: initialStateSelectedDay }));
    this.store.dispatch(new fromCore.Go({
      path: ['day', 'create']
    }));
  }

  onEdit(day: Day) {
    this.store.dispatch(new fromDay.SetSelected({ selected: { ...initialStateSelectedDay, selectedEntity: day } }));
    this.store.dispatch(new fromCore.Go({
      path: ['day', day.day_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromDay.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromDay.SetSelected({ selected: initialStateSelectedDay }));
    this.store.dispatch(new fromCore.Go({
      path: ['day']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromDay.Reset({ redirect: true }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
