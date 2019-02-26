import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { OfficeDepartment } from '@web/app/features/b/office-department/models/office-department.model';

@Component({
  selector: 'app-form-office-department',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-office-department.component.html',
  styles: []
})
export class FormOfficeDepartmentComponent implements OnChanges, OnInit {

  @Input() entityLabel: string;
  @Input() entities: OfficeDepartment[];
  @Output() submitted = new EventEmitter<OfficeDepartment>();

  officeDepartmentForm = this.formBuilder.group({
    office: this.formBuilder.control('', [Validators.required]),
    department: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.entities.length > 0) {
      this.officeDepartmentForm.reset();
      switch (this.entityLabel) {
        case 'office':
          this.officeDepartmentForm.setValue({
            office: this.entities[0].office,
            department: ''
          });
          break;

        case 'department':
          this.officeDepartmentForm.setValue({
            office: '',
            department: this.entities[0].department
          });
          break;
      }
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
