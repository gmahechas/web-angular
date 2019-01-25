import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Schedule } from '@web/app/features/f/schedule/models/schedule.model';

@Component({
  selector: 'app-form-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-schedule.component.html',
  styles: []
})
export class FormScheduleComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.scheduleForm.disable();
    } else {
      this.scheduleForm.enable();
    }
  }
  @Input() schedule: Schedule;
  @Output() submitted: EventEmitter<Schedule> = new EventEmitter<Schedule>();

  scheduleForm = this.formBuilder.group({
    schedule: this.formBuilder.group({
      schedule_name: this.formBuilder.control('', [Validators.required])
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.schedule) {
      this.scheduleForm.reset();
      this.scheduleForm.setValue({
        schedule: {
          schedule_name: this.schedule.schedule_name
        }
      });
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.schedule) {
      if (this.scheduleForm.dirty) {
        const updated = {
          schedule_id: this.schedule.schedule_id,
          ...this.scheduleForm.value.schedule
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit({ ...this.scheduleForm.value.schedule });
    }

  }

}
