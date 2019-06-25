import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromScheduleDayHourRange from '@web/app/features/f/schedule-day-hour-range/store';
import { initialState } from '@web/app/features/f/schedule-day-hour-range/store/reducers/search-schedule-day-hour-range.reducer';

import { SearchScheduleDayHourRange } from '@web/app/features/f/schedule-day-hour-range/models/search-schedule-day-hour-range.model';

@Component({
  selector: 'app-dropdown-page-schedule-day-hour-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-schedule-day-hour-range.component.html',
  styles: []
})
export class DropdownPageScheduleDayHourRangeComponent implements OnChanges, OnInit {

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
  @Input() keyboardKey: 'Enter' | 'Any' = 'Enter';
  @Input() keyUpTimes = 3;
  @Input() loadOnInit = false;
  @Input() searchScheduleDayHourRange: SearchScheduleDayHourRange;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromScheduleDayHourRange.getAllEntities));
  entityId = 'schedule_day_hour_range_id';

  constructor(
    private store: Store<fromScheduleDayHourRange.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(fromScheduleDayHourRange.EntityActions.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchScheduleDayHourRange) {
      setTimeout(() => {
        this.onLoad({
          schedule_day_hour_range:
            (this.searchScheduleDayHourRange) ?
              this.searchScheduleDayHourRange.schedule_day_hour_range : null,
          schedule_day:
            (this.searchScheduleDayHourRange.schedule_day) ?
              this.searchScheduleDayHourRange.schedule_day : null,
          hour_range:
            (this.searchScheduleDayHourRange.hour_range) ?
              this.searchScheduleDayHourRange.hour_range : null
        });
      });
    }
  }

  onLoad(searchScheduleDayHourRange: SearchScheduleDayHourRange) {
    this.store.dispatch(fromScheduleDayHourRange.EntityActions.LoadEntityShared({
      search: searchScheduleDayHourRange
    }));
  }

  keyUp(event) {
    this.onLoad({
      schedule_day_hour_range:
        (this.searchScheduleDayHourRange) ?
          this.searchScheduleDayHourRange.schedule_day_hour_range : null,
      schedule_day:
        (this.searchScheduleDayHourRange.schedule_day) ?
          this.searchScheduleDayHourRange.schedule_day : null,
      hour_range:
        (this.searchScheduleDayHourRange.hour_range) ?
          this.searchScheduleDayHourRange.hour_range : null
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
