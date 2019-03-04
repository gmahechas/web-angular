import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromScheduleDay from '@web/app/features/f/schedule-day/store';
import { initialState } from '@web/app/features/f/schedule-day/store/reducers/search-schedule-day.reducer';

import { SearchScheduleDay } from '@web/app/features/f/schedule-day/models/search-schedule-day.model';

@Component({
  selector: 'app-dropdown-page-schedule-day',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-schedule-day.component.html',
  styles: []
})
export class DropdownPageScheduleDayComponent implements OnChanges, OnInit {

  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() filter = true;
  @Input() onlyShow: 'store' | 'store_form' | 'form' = 'store_form';
  @Input() placeholder: string[];
  @Input() filterPlaceholder: string[];
  @Input() showClear: boolean;
  @Input() dropdownIcon: string;
  @Input() emptyFilterMessage: string[];
  @Input() isConditional = false;
  @Input() searchByKeyUp = true;
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() keyUpTimes = 3;
  @Input() loadOnInit = false;
  @Input() searchScheduleDay: SearchScheduleDay;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromScheduleDay.getAllEntities));
  entityId = 'schedule_day_id';

  constructor(
    private store: Store<fromScheduleDay.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(new fromScheduleDay.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchScheduleDay) {
      setTimeout(() => {
        this.onLoad({
          schedule_day:
            (this.searchScheduleDay.schedule_day) ?
              this.searchScheduleDay.schedule_day : null,
          schedule:
            (this.searchScheduleDay.schedule) ?
              this.searchScheduleDay.schedule : null,
          day:
            (this.searchScheduleDay.day) ?
              this.searchScheduleDay.day : null
        });
      });
    }
  }

  onLoad(searchScheduleDay: SearchScheduleDay) {
    this.store.dispatch(new fromScheduleDay.LoadEntityShared({
      search: searchScheduleDay
    }));
  }

  keyUp(event) {
    this.onLoad({
      schedule_day: (this.searchScheduleDay) ? (this.searchScheduleDay.schedule_day) ? this.searchScheduleDay.schedule_day : null : null,
      schedule: (this.searchScheduleDay) ? (this.searchScheduleDay.schedule) ? this.searchScheduleDay.schedule : null : null,
      day: (this.searchScheduleDay) ? (this.searchScheduleDay.day) ? this.searchScheduleDay.day : null : null,
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
