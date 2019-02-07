import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SearchDepartment } from '@web/app/features/b/department/models/search-department.model';

@Component({
  selector: 'app-search-form-department',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-department.component.html',
  styles: []
})
export class SearchFormDepartmentComponent implements OnChanges, OnInit {

  @Input() query: SearchDepartment;
  @Output() search = new EventEmitter<SearchDepartment>();
  @Output() create = new EventEmitter<boolean>();
  @Output() resetSearch = new EventEmitter<boolean>();

  searchFormDepartment = this.formBuilder.group({
    department: this.formBuilder.group({
      department_id: this.formBuilder.control(''),
      department_name: this.formBuilder.control('')
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormDepartment.setValue({
      department: {
        department_id: this.query.department.department_id,
        department_name: this.query.department.department_name
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.search.emit(this.searchFormDepartment.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}
