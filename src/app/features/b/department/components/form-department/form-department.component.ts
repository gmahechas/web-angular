import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Department } from '@web/app/features/b/department/models/department.model';

@Component({
  selector: 'app-form-department',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-department.component.html',
  styles: []
})
export class FormDepartmentComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.departmentForm.disable();
    } else {
      this.departmentForm.enable();
    }
  }
  @Input() department: Department;
  @Output() submitted = new EventEmitter<Department>();

  departmentForm = this.formBuilder.group({
    department: this.formBuilder.group({
      department_name: this.formBuilder.control('', [Validators.required]),
      department_description: this.formBuilder.control('', [Validators.required]),
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.department) {
      this.departmentForm.reset();
      this.departmentForm.setValue({
        department: {
          department_name: this.department.department_name,
          department_description: this.department.department_description
        }
      });
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.department) {
      if (this.departmentForm.dirty) {
        const updated = {
          department_id: this.department.department_id,
          ...this.departmentForm.value.department
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit({ ...this.departmentForm.value.department });
    }

  }

}
