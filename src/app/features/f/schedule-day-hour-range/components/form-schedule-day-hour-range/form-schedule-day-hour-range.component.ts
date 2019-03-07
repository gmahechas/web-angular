import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ScheduleDayHourRange } from '@web/app/features/f/schedule-day-hour-range/models/schedule-day-hour-range.model';
import { ScheduleDay } from '@web/app/features/f/schedule-day/models/schedule-day.model';
import { HourRange } from '@web/app/features/f/hour-range/models/hour-range.model';

@Component({
  selector: 'app-form-schedule-day-hour-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-schedule-day-hour-range.component.html',
  styles: []
})
export class FormScheduleDayHourRangeComponent implements OnChanges, OnInit {

  @Input() entityLabel: string;
  @Input() scheduleDay: ScheduleDay;
  @Input() hourRange: HourRange;
  @Output() submitted = new EventEmitter<ScheduleDayHourRange>();

  scheduleDayHourRangeForm = this.formBuilder.group({
    schedule_day: this.formBuilder.control('', [Validators.required]),
    hour_range: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    switch (this.entityLabel) {
      case 'schedule':
        this.scheduleDayHourRangeForm.setValue({
          schedule_day: this.scheduleDay,
          hour_range: null
        });
        break;
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted.emit({
      schedule_day_hour_range_status: true,
      schedule_day_id: this.scheduleDayHourRangeForm.value.schedule_day.schedule_day_id,
      hour_range_id: this.scheduleDayHourRangeForm.value.hour_range.hour_range_id
    });
    switch (this.entityLabel) {
      case 'schedule':
        this.scheduleDayHourRangeForm.controls.hour_range.reset();
        break;
    }
  }

}
