import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ScheduleDayHourRange } from '@web/app/features/f/schedule-day-hour-range/models/schedule-day-hour-range.model';

@Component({
  selector: 'app-form-schedule-day-hour-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-schedule-day-hour-range.component.html',
  styles: []
})
export class FormScheduleDayHourRangeComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.scheduleDayHourRangeForm.disable();
    } else {
      this.scheduleDayHourRangeForm.enable();
    }
  }
  @Input() scheduleDayHourRange: ScheduleDayHourRange;
  @Output() submitted = new EventEmitter<ScheduleDayHourRange>();

  scheduleDayHourRangeForm = this.formBuilder.group({
    schedule_day_hour_range: this.formBuilder.group({
      // TODO:
    }),
    // TODO:
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.scheduleDayHourRange) {
      this.scheduleDayHourRangeForm.reset();
      this.scheduleDayHourRangeForm.setValue({
        schedule_day_hour_range: {
          // TODO:
        },
        // TODO:
      });
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.scheduleDayHourRange) {
      if (this.scheduleDayHourRangeForm.dirty) {
        const updated = {
            schedule_day_hour_range_id: this.scheduleDayHourRange.schedule_day_hour_range_id,
            ...this.scheduleDayHourRangeForm.value.schedule_day_hour_range,
            // TODO:
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit({...this.scheduleDayHourRangeForm.value.schedule_day_hour_range}); // TODO:
    }

  }

}
