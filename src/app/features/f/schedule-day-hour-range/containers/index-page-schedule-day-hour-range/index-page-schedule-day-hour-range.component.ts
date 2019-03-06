import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromScheduleDayHourRange from '@web/app/features/f/schedule-day-hour-range/store';
import * as fromScheduleDay from '@web/app/features/f/schedule-day/store';
import * as fromHourRange from '@web/app/features/f/hour-range/store';
import * as fromCore from '@web/app/core/store';

import { ScheduleDayHourRange } from '@web/app/features/f/schedule-day-hour-range/models/schedule-day-hour-range.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index-page-schedule-day-hour-range',
  templateUrl: './index-page-schedule-day-hour-range.component.html',
  styles: []
})
export class IndexPageScheduleDayHourRangeComponent implements OnInit, OnDestroy {

  data$ = this.store.pipe(select(fromScheduleDayHourRange.getAllEntities));
  scheduleDay$ = this.store.pipe(select(fromScheduleDay.getSelected));
  hourRange$ = this.store.pipe(select(fromHourRange.getSelected));
  configTable: any;
  entityLabel: string;
  suscription: Subscription;

  constructor(
    private store: Store<fromCore.State>,
    private route: ActivatedRoute
  ) {
    this.configTable = {
      dataKey: 'schedule_day_hour_range_id',
      cols: [

      ]
    };
  }

  ngOnInit() {
    this.suscription = this.route.paramMap.subscribe((paramsMap: ParamMap) => {

      const key = paramsMap.keys[0];

      this.entityLabel = key.split('_')[0];

    });
  }

  handleColumnSelected({ column, event }) {
    switch (column) {
      case 0:
        this.onEdit({
          ...event,
          user_office_project_status: !event.user_office_project_status
        });
        break;
    }
  }

  onStore(scheduleDayHourRange: ScheduleDayHourRange) {
    this.store.dispatch(new fromScheduleDayHourRange.StoreEntity({ entity: scheduleDayHourRange }));
    /*     switch (this.entityLabel) {
          case 'user':
          case 'office':
            this.store.dispatch(new fromProject.Reset({ redirect: false }));
            break;
          case 'project':
            this.store.dispatch(new fromUserOffice.Reset({ redirect: false }));
            break;
        } */
  }

  onEdit(scheduleDayHourRange: ScheduleDayHourRange) {
    this.store.dispatch(new fromScheduleDayHourRange.UpdateEntity({ entity: scheduleDayHourRange }));
  }

  ngOnDestroy() {
    this.store.dispatch(new fromScheduleDayHourRange.Reset({ redirect: false }));
  }
}
