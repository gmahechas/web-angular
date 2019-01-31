import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { HourRange } from '@web/app/features/f/hour-range/models/hour-range.model';

@Component({
  selector: 'app-form-hour-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-hour-range.component.html',
  styles: []
})
export class FormHourRangeComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.hourRangeForm.disable();
    } else {
      this.hourRangeForm.enable();
    }
  }
  @Input() hourRange: HourRange;
  @Output() submitted: EventEmitter<HourRange> = new EventEmitter<HourRange>();

  hourRangeForm = this.formBuilder.group({
    hour_range: this.formBuilder.group({
      hour_range_name: this.formBuilder.control('', [Validators.required]),
      hour_range_description: this.formBuilder.control('', [Validators.required]),
      hour_range_start: this.formBuilder.control('', [Validators.required]),
      hour_range_end: this.formBuilder.control('', [Validators.required])
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.hourRange) {
      this.hourRangeForm.reset();
      this.hourRangeForm.setValue({
        hour_range: {
          hour_range_name: this.hourRange.hour_range_name,
          hour_range_description: this.hourRange.hour_range_description,
          hour_range_start: this.hourRange.hour_range_start,
          hour_range_end: this.hourRange.hour_range_end
        }
      });
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.hourRange) {
      if (this.hourRangeForm.dirty) {
        const updated = {
          hour_range_id: this.hourRange.hour_range_id,
          ...this.hourRangeForm.value.hour_range
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit({ ...this.hourRangeForm.value.hour_range });
    }

  }

}
