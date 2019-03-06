import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromHourRange from '@web/app/features/f/hour-range/store';
import * as fromCore from '@web/app/core/store';

import { HourRange } from '@web/app/features/f/hour-range/models/hour-range.model';
import { initialStateSelectedHourRange } from '@web/app/features/f/hour-range/models/selected-hour-range.model';

@Component({
  selector: 'app-form-page-hour-range',
  templateUrl: './form-page-hour-range.component.html',
  styles: []
})
export class FormPageHourRangeComponent implements OnInit {

  pending$ = this.store.pipe(select(fromHourRange.getPending));
  hourRange$ = this.store.pipe(select(fromHourRange.getSelectedByRouter));

  constructor(
    private store: Store<fromHourRange.State>
  ) { }

  ngOnInit() {
  }

  onStore(hourRange: HourRange) {
    this.store.dispatch(new fromHourRange.StoreEntity({ entity: hourRange }));
  }

  onUpdate(hourRange: HourRange) {
    this.store.dispatch(new fromHourRange.UpdateEntity({ entity: hourRange }));
  }

  onCancel() {
    this.store.dispatch(new fromHourRange.SetSelected({ selected: initialStateSelectedHourRange }));
    this.store.dispatch(new fromCore.Go({
      path: ['hourRange']
    }));
  }

  onScheduleDayHourRange(hourRange: HourRange) {
    this.store.dispatch(new fromCore.Go({
      path: [
        'hour-range',
        hourRange.hour_range_id,
        { outlets: { 'router-outlet-schedule-day-hour-range': ['schedule-day-hour-range', 'hour-range', hourRange.hour_range_id] } }
      ]
    }));
  }


  onDestroy(hourRange: HourRange) {
    this.store.dispatch(new fromHourRange.DestroyEntity({ entity: hourRange }));
  }
}
