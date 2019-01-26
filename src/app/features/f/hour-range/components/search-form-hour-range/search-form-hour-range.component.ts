import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SearchHourRange } from '@web/app/features/f/hour-range/models/search-hour-range.model';

@Component({
  selector: 'app-search-form-hour-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-hour-range.component.html',
  styles: []
})
export class SearchFormHourRangeComponent implements OnChanges, OnInit {

  @Input() query: SearchHourRange;
  @Output() search: EventEmitter<SearchHourRange> = new EventEmitter<SearchHourRange>();
  @Output() create: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() resetSearch: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchFormHourRange = this.formBuilder.group({
    hour_range: this.formBuilder.group({
      hour_range_id: this.formBuilder.control(''),
      hour_range_name: this.formBuilder.control('')
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormHourRange.setValue({
      hour_range: {
        hour_range_id: this.query.hour_range.hour_range_id,
        hour_range_name: this.query.hour_range.hour_range_name
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.search.emit(this.searchFormHourRange.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}
