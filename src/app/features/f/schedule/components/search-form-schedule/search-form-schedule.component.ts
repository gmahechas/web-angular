import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SearchSchedule } from '@web/app/features/f/schedule/models/search-schedule.model';

@Component({
  selector: 'app-search-form-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-schedule.component.html',
  styles: []
})
export class SearchFormScheduleComponent implements OnChanges, OnInit {

  @Input() query: SearchSchedule;
  @Output() search: EventEmitter<SearchSchedule> = new EventEmitter<SearchSchedule>();
  @Output() create: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() resetSearch: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchFormSchedule = this.formBuilder.group({
    schedule: this.formBuilder.group({
      schedule_id: this.formBuilder.control(''),
      schedule_name: this.formBuilder.control('')
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormSchedule.setValue({
      schedule: {
        schedule_id: this.query.schedule.schedule_id,
        schedule_name: this.query.schedule.schedule_name
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.search.emit(this.searchFormSchedule.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}
