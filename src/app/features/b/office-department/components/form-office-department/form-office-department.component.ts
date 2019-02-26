import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { OfficeDepartment } from '@web/app/features/b/office-department/models/office-department.model';
import { Office } from '@web/app/features/b/office/models/office.model';
import { Department } from '@web/app/features/b/department/models/department.model';

@Component({
  selector: 'app-form-office-department',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-office-department.component.html',
  styles: []
})
export class FormOfficeDepartmentComponent implements OnChanges, OnInit {

  @Input() entityLabel: string;
  @Input() office: Office;
  @Input() department: Department;
  @Output() submitted = new EventEmitter<OfficeDepartment>();

  officeDepartmentForm = this.formBuilder.group({
    office: this.formBuilder.control('', [Validators.required]),
    department: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.officeDepartmentForm.reset();
    switch (this.entityLabel) {
      case 'office':
        this.officeDepartmentForm.setValue({
          office: this.office,
          department: null
        });
        break;
      case 'department':
        this.officeDepartmentForm.setValue({
          office: null,
          department: this.department
        });
        break;
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted.emit({
      office_department_status: true,
      office_id: this.officeDepartmentForm.value.office.office_id,
      department_id: this.officeDepartmentForm.value.department.department_id
    });
    this.officeDepartmentForm.reset();
  }
}
