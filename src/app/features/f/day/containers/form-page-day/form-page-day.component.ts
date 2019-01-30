import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromDay from '@web/app/features/f/day/store';
import * as fromCore from '@web/app/core/store';

import { Day } from '@web/app/features/f/day/models/day.model';
import { initialStateSelectedDay } from '@web/app/features/f/day/models/selected-day.model';

@Component({
  selector: 'app-form-page-day',
  templateUrl: './form-page-day.component.html',
  styles: []
})
export class FormPageDayComponent implements OnInit {

  pending$ = this.store.pipe(select(fromDay.getPending));
  day$ = this.store.pipe(select(fromDay.getSelectedByRouter));

  constructor(
    private store: Store<fromDay.State>
  ) { }

  ngOnInit() {
  }

  onStore(day: Day) {
    this.store.dispatch(new fromDay.StoreEntity({ entity: day }));
  }

  onUpdate(day: Day) {
    this.store.dispatch(new fromDay.UpdateEntity({ entity: day }));
  }

  onCancel() {
    this.store.dispatch(new fromDay.SetSelected({ selected: initialStateSelectedDay }));
    this.store.dispatch(new fromCore.Go({
      path: ['day']
    }));
  }

  onDestroy(day: Day) {
    this.store.dispatch(new fromDay.DestroyEntity({ entity: day }));
  }
}
