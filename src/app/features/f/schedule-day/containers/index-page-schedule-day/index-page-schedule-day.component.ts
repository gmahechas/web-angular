import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromScheduleDay from '@web/app/features/f/schedule-day/store';
import * as fromCore from '@web/app/core/store';

import { ScheduleDay } from '@web/app/features/f/schedule-day/models/schedule-day.model';

@Component({
  selector: 'app-index-page-schedule-day',
  templateUrl: './index-page-schedule-day.component.html',
  styles: []
})
export class IndexPageScheduleDayComponent implements OnInit, OnDestroy {

  data$ = this.store.pipe(select(fromScheduleDay.getAllEntities));
  configTable: any;

  constructor(
    private store: Store<fromScheduleDay.State>,
    private route: ActivatedRoute
  ) {
    this.configTable = {
      dataKey: 'schedule_day_id',
      cols: [
        { fields: ['day.day_name'], header: ['day.model.day_name'], style: { width: '70%' } },
      ],
      colSelection: [
        {
          type: 'checkbox',
          field: 'schedule_day_status',
          header: [],
          style: { width: '10%' }
        },
        {
          type: 'button',
          header: [],
          label: ['hour_range.plural'],
          style: { width: '20%' }
        }
      ]
    };
  }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.keys[0];
    const val = this.route.snapshot.params[key];

    setTimeout(() => {
      this.store.dispatch(new fromScheduleDay.LoadEntity({
        search: { [key.split('_')[0]]: { [key]: val } }
      }));
    });
  }

  handleColumnSelected({ column, event }) {
    switch (column) {
      case 0:
        this.onEdit({
          ...event,
          schedule_day_status: !event.schedule_day_status
        });
        break;
      case 1:
        this.onScheduleDayHourRange(event);
        break;
    }
  }

  onEdit(scheduleDay: ScheduleDay) {
    this.store.dispatch(new fromScheduleDay.UpdateEntity({ entity: scheduleDay }));
  }

  onDelete(scheduleDay: ScheduleDay) {
    this.store.dispatch(new fromScheduleDay.DestroyEntity({ entity: scheduleDay }));
  }

  onScheduleDayHourRange(scheduleDay: ScheduleDay) {
    this.store.dispatch(new fromScheduleDay.SetSelected({ selected: { selectedEntity: scheduleDay } }));
    this.store.dispatch(new fromCore.Go({
      path: [
        'schedule',
        scheduleDay.schedule_id,
        {
          outlets: {
            'router-outlet-schedule-day': ['schedule-day', 'schedule', scheduleDay.schedule_id, {
              outlets: {
                'router-outlet-schedule-day-hour-range':
                  ['schedule-day-hour-range', 'schedule-day', scheduleDay.schedule_id, scheduleDay.schedule_day_id]
              }
            }]
          }
        }
      ]
    }));
  }

  ngOnDestroy() {
    this.store.dispatch(new fromScheduleDay.Reset({ redirect: false }));
  }
}
