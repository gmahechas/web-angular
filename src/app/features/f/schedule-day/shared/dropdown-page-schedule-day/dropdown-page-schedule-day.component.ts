import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromScheduleDay from '@web/app/features/f/schedule-day/store';

import { SearchScheduleDay } from '@web/app/features/f/schedule-day/models/search-schedule-day.model';

@Component({
  selector: 'app-dropdown-page-schedule-day',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-schedule-day.component.html',
  styles: []
})
export class DropdownPageScheduleDayComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() filter = true;
  @Input() placeholder: string[];
  @Input() filterPlaceholder: string[];
  @Input() showClear: boolean;
  @Input() dropdownIcon: string;
  @Input() emptyFilterMessage: string[];
  @Input() isConditional = false;
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() keyUpTimes = 3;
  @Input() searchScheduleDay: SearchScheduleDay;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromScheduleDay.getAllEntities));
  entityId = 'schedule_day_id';

  constructor(
    private store: Store<fromScheduleDay.State>
  ) { }

  ngOnInit() {
  }

  onLoad(searchScheduleDay: SearchScheduleDay) {
    this.store.dispatch(new fromScheduleDay.LoadEntityShared({
      search: searchScheduleDay
    }));
  }

  keyUp(event) {
    this.onLoad({
      schedule_day: {
        schedule_day_id: '',
        schedule_day_status: null
      },
      schedule: (this.searchScheduleDay) ? (this.searchScheduleDay.schedule) ? this.searchScheduleDay.schedule : null : null,
      day: (this.searchScheduleDay) ? (this.searchScheduleDay.day) ? this.searchScheduleDay.day : null : null,
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
