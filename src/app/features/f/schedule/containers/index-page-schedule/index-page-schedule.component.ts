import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromSchedule from '@web/app/features/f/schedule/store';
import * as fromCore from '@web/app/core/store';

import { Schedule } from '@web/app/features/f/schedule/models/schedule.model';
import { SearchSchedule } from '@web/app/features/f/schedule/models/search-schedule.model';
import { SelectedSchedule, initialStateSelectedSchedule } from '@web/app/features/f/schedule/models/selected-schedule.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-schedule',
  templateUrl: './index-page-schedule.component.html',
  styles: []
})
export class IndexPageScheduleComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selectedEntity: Schedule;

  query$ = this.store.pipe(select(fromSchedule.getQuery, take(1)));

  data$ = this.store.pipe(select(fromSchedule.getAllEntities));
  total$ = this.store.pipe(select(fromSchedule.getTotal));
  perPage$ = this.store.pipe(select(fromSchedule.getPerPage));
  from$ = this.store.pipe(select(fromSchedule.getFrom));
  to$ = this.store.pipe(select(fromSchedule.getTo));
  configTable: any;

  constructor(
    private store: Store<fromSchedule.State>
  ) {
    this.configTable = {
      dataKey: 'schedule_id',
      cols: [
        { fields: ['schedule_id'], header: ['schedule.model.schedule_id'], style: { width: '5%' } },
        { fields: ['schedule_name'], header: ['schedule.model.schedule_name'], style: { width: '95%' } },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(fromSchedule.getSelected), take(1)).subscribe(
      (selected: SelectedSchedule) => {
        if (selected.gotoScheduleDay && selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(new fromCore.Go({
            path: [
              'schedule',
              selected.selectedEntity.schedule_id,
              { outlets: { 'router-outlet-schedule-day': ['schedule-day', 'schedule', selected.selectedEntity.schedule_id] } }
            ]
          }));
        } else if (selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(new fromCore.Go({
            path: ['schedule', selected.selectedEntity.schedule_id]
          }));
        }
      }
    );
  }

  onLoad(scheduleSearch: SearchSchedule) {
    this.store.dispatch(new fromSchedule.LoadEntity({
      search: {
        ...scheduleSearch,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromSchedule.SetSelected({ selected: initialStateSelectedSchedule }));
    this.store.dispatch(new fromCore.Go({
      path: ['schedule', 'create']
    }));
  }

  onEdit(schedule: Schedule) {
    this.store.dispatch(new fromSchedule.SetSelected({ selected: { ...initialStateSelectedSchedule, selectedEntity: schedule } }));
    this.store.dispatch(new fromCore.Go({
      path: ['schedule', schedule.schedule_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromSchedule.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromSchedule.SetSelected({ selected: initialStateSelectedSchedule }));
    this.store.dispatch(new fromCore.Go({
      path: ['schedule']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromSchedule.Reset({ redirect: true }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
