import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SearchScheduleDayHourRange } from '@web/app/features/f/schedule-day-hour-range/models/search-schedule-day-hour-range.model';

@Component({
  selector: 'app-search-form-schedule-day-hour-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-schedule-day-hour-range.component.html',
  styles: []
})
export class SearchFormScheduleDayHourRangeComponent implements OnChanges, OnInit {

  @Input() query: SearchScheduleDayHourRange;
  @Output() search = new EventEmitter<SearchScheduleDayHourRange>();
  @Output() create = new EventEmitter<boolean>();
  @Output() resetSearch = new EventEmitter<boolean>();

  searchFormScheduleDayHourRange = this.formBuilder.group({
    schedule_day_hour_range: this.formBuilder.group({
      // TODO:
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormScheduleDayHourRange.setValue({
      schedule_day_hour_range: {
        // TODO:
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.search.emit(this.searchFormScheduleDayHourRange.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}