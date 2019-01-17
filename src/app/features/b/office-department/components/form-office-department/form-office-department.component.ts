import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { OfficeDepartment } from '@web/app/features/b/office-department/models/office-department.model';

@Component({
  selector: 'app-form-office-department',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-office-department.component.html',
  styles: []
})
export class FormOfficeDepartmentComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.officeDepartmentForm.disable();
    } else {
      this.officeDepartmentForm.enable();
    }
  }
  @Input() officeDepartment: OfficeDepartment;
  @Output() submitted: EventEmitter<OfficeDepartment> = new EventEmitter<OfficeDepartment>();

  officeDepartmentForm = this.formBuilder.group({
    office_department: this.formBuilder.group({
      // TODO:
    }),
    // TODO:
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.officeDepartment) {
      this.officeDepartmentForm.reset();
      this.officeDepartmentForm.setValue({
        office_department: {
          // TODO:
        },
        // TODO:
      });
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.officeDepartment) {
      if (this.officeDepartmentForm.dirty) {
        const updated = {
            office_department_id: this.officeDepartment.office_department_id,
            ...this.officeDepartmentForm.value.office_department,
            // TODO:
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit({...this.officeDepartmentForm.value.office_department}); // TODO:
    }

  }

}
