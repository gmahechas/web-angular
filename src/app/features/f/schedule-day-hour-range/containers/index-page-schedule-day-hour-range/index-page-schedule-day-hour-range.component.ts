import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromScheduleDayHourRange from '@web/app/features/f/schedule-day-hour-range/store';
import * as fromScheduleDay from '@web/app/features/f/schedule-day/store';
import * as fromHourRange from '@web/app/features/f/hour-range/store';
import * as fromCore from '@web/app/core/store';

import { ScheduleDayHourRange } from '@web/app/features/f/schedule-day-hour-range/models/schedule-day-hour-range.model';
import { SearchScheduleDayHourRange } from '@web/app/features/f/schedule-day-hour-range/models/search-schedule-day-hour-range.model';

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
        { fields: ['hour_range.hour_range_name'], header: ['hour_range.model.hour_range_name'], style: { width: '40%' } },
        { fields: ['hour_range.hour_range_start'], header: ['hour_range.model.hour_range_start'], style: { width: '25%' } },
        { fields: ['hour_range.hour_range_end'], header: ['hour_range.model.hour_range_end'], style: { width: '25%' } },
      ],
      colSelection: [
        {
          type: 'checkbox',
          field: 'schedule_day_hour_range_status',
          header: [],
          style: { width: '10%' }
        }
      ]
    };
  }

  ngOnInit() {
    this.suscription = this.route.paramMap.subscribe((paramsMap: ParamMap) => {

      const key = paramsMap.keys[0];
      this.entityLabel = key.split('_')[0];

      switch (key) {
        case 'schedule_id':
          const scheduleDayId = paramsMap.get(paramsMap.keys[1]);
          setTimeout(() => {
            this.onLoad({
              schedule_day: {
                schedule_day_id: +scheduleDayId
              }
            });
          });
          break;
      }
    });
  }

  onLoad(searchScheduleDayHourRange: SearchScheduleDayHourRange) {
    this.store.dispatch(new fromScheduleDayHourRange.LoadEntity({
      search: searchScheduleDayHourRange
    }));
  }

  handleColumnSelected({ column, event }) {
    switch (column) {
      case 0:
        this.onEdit({
          ...event,
          schedule_day_hour_range_status: !event.schedule_day_hour_range_status
        });
        break;
    }
  }

  onStore(scheduleDayHourRange: ScheduleDayHourRange) {
    this.store.dispatch(new fromScheduleDayHourRange.StoreEntity({ entity: scheduleDayHourRange }));
  }

  onEdit(scheduleDayHourRange: ScheduleDayHourRange) {
    this.store.dispatch(new fromScheduleDayHourRange.UpdateEntity({ entity: scheduleDayHourRange }));
  }

  ngOnDestroy() {
    this.store.dispatch(new fromScheduleDayHourRange.Reset({ redirect: false }));
  }
}
