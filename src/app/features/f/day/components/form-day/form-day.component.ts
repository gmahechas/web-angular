import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Day } from '@web/app/features/f/day/models/day.model';

@Component({
  selector: 'app-form-day',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-day.component.html',
  styles: []
})
export class FormDayComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.dayForm.disable();
    } else {
      this.dayForm.enable();
    }
  }
  @Input() day: Day;
  @Output() submitted = new EventEmitter<Day>();

  dayForm = this.formBuilder.group({
    day: this.formBuilder.group({
      day_name: this.formBuilder.control('', [Validators.required]),
    }),
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.day) {
      this.dayForm.reset();
      this.dayForm.setValue({
        day: {
          day_name: this.day.day_name
        }
      });
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.day) {
      if (this.dayForm.dirty) {
        const updated = {
          day_id: this.day.day_id,
          ...this.dayForm.value.day
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit({ ...this.dayForm.value.day });
    }

  }

}
