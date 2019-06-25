import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromSchedule from '@web/app/features/f/schedule/store';
import * as fromCore from '@web/app/core/store';

import { Schedule } from '@web/app/features/f/schedule/models/schedule.model';
import { initialStateSelectedSchedule } from '@web/app/features/f/schedule/models/selected-schedule.model';

@Component({
  selector: 'app-form-page-schedule',
  templateUrl: './form-page-schedule.component.html',
  styles: []
})
export class FormPageScheduleComponent implements OnInit {

  pending$ = this.store.pipe(select(fromSchedule.getPending));
  schedule$ = this.store.pipe(select(fromSchedule.getSelectedByRouter));

  constructor(
    private store: Store<fromSchedule.State>
  ) { }

  ngOnInit() {
  }

  onStore(schedule: Schedule) {
    this.store.dispatch(fromSchedule.EntityActions.StoreEntity({ entity: schedule }));
  }

  onUpdate(schedule: Schedule) {
    this.store.dispatch(fromSchedule.EntityActions.UpdateEntity({ entity: schedule }));
  }

  onCancel() {
    this.store.dispatch(fromSchedule.EntityActions.SetSelected({ selected: initialStateSelectedSchedule }));
    this.store.dispatch(new fromCore.Go({
      path: ['schedule']
    }));
  }

  onDestroy(schedule: Schedule) {
    this.store.dispatch(fromSchedule.EntityActions.DestroyEntity({ entity: schedule }));
  }

  onScheduleDay(schedule: Schedule) {
    this.store.dispatch(fromSchedule.EntityActions.SetSelected({ selected: { gotoScheduleDay: true } }));
    this.store.dispatch(new fromCore.Go({
      path: [
        'schedule',
        schedule.schedule_id,
        { outlets: { 'router-outlet-schedule-day': ['schedule-day', 'schedule', schedule.schedule_id] } }
      ]
    }));
  }
}
