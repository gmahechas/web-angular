import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromDepartment from '@web/app/features/b/department/store';
import * as fromCore from '@web/app/core/store';

import { Department } from '@web/app/features/b/department/models/department.model';
import { initialStateSelectedDepartment } from '@web/app/features/b/department/models/selected-department.model';

@Component({
  selector: 'app-form-page-department',
  templateUrl: './form-page-department.component.html',
  styles: []
})
export class FormPageDepartmentComponent implements OnInit {

  pending$ = this.store.pipe(select(fromDepartment.getPending));
  department$ = this.store.pipe(select(fromDepartment.getSelectedByRouter));

  constructor(
    private store: Store<fromDepartment.State>
  ) { }

  ngOnInit() {
  }

  onStore(department: Department) {
    this.store.dispatch(new fromDepartment.StoreEntity({ entity: department }));
  }

  onUpdate(department: Department) {
    this.store.dispatch(new fromDepartment.UpdateEntity({ entity: department }));
  }

  onCancel() {
    this.store.dispatch(new fromDepartment.SetSelected({ selected: initialStateSelectedDepartment }));
    this.store.dispatch(new fromCore.Go({
      path: ['department']
    }));
  }

  onDestroy(department: Department) {
    this.store.dispatch(new fromDepartment.DestroyEntity({ entity: department }));
  }

  onOfficeDepartment(department: Department) {
    this.store.dispatch(new fromDepartment.SetSelected({ selected: { gotoOfficeDepartment: true } }));
    this.store.dispatch(new fromCore.Go({
      path: ['department', department.department_id, {
        outlets: { 'router-outlet-user-department': ['office-department', 'department', department.department_id] }
      }]
    }));
  }
}
