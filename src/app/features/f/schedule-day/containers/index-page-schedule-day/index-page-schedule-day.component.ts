import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromScheduleDay from '@web/app/features/f/schedule-day/store';

import { ScheduleDay } from '@web/app/features/f/schedule-day/models/schedule-day.model';

@Component({
  selector: 'app-index-page-schedule-day',
  templateUrl: './index-page-schedule-day.component.html',
  styles: []
})
export class IndexPageScheduleDayComponent implements OnInit, OnDestroy {

  data$ = this.store.pipe(select(fromScheduleDay.getAllEntities));

  constructor(
    private store: Store<fromScheduleDay.State>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.keys[0];
    const val = this.route.snapshot.params[key];

    setTimeout(() => {
      this.store.dispatch(new fromScheduleDay.LoadEntity({
        search: { [key.split('_')[0]]: { [key]: val } }
      }));
    });
  }

  onEdit(scheduleDay: ScheduleDay) {
    this.store.dispatch(new fromScheduleDay.UpdateEntity({ entity: scheduleDay }));
  }

  onDelete(scheduleDay: ScheduleDay) {
    this.store.dispatch(new fromScheduleDay.DestroyEntity({ entity: scheduleDay }));
  }

  ngOnDestroy() {
    this.store.dispatch(new fromScheduleDay.Reset());
  }
}
