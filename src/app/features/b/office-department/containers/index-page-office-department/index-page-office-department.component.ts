import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromOfficeDepartment from '@web/app/features/b/office-department/store';
import * as fromCore from '@web/app/core/store';

import { OfficeDepartment } from '@web/app/features/b/office-department/models/office-department.model';
import { SearchOfficeDepartment } from '@web/app/features/b/office-department/models/search-office-department.model';
import { initialStateSelectedOfficeDepartment } from '@web/app/features/b/office-department/models/selected-office-department.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-office-department',
  templateUrl: './index-page-office-department.component.html',
  styles: []
})
export class IndexPageOfficeDepartmentComponent implements OnInit {

  data$ = this.store.pipe(select(fromOfficeDepartment.getAllEntities));

  constructor(
    private store: Store<fromOfficeDepartment.State>
  ) { }

  ngOnInit() {
  }

  onLoad(officeDepartmentSearch: SearchOfficeDepartment) {

  }

  onCreate() {
    this.store.dispatch(new fromOfficeDepartment.SetSelected({ selected: initialStateSelectedOfficeDepartment }));
    this.store.dispatch(new fromCore.Go({
      path: ['office_department', 'create']
    }));
  }

  onEdit(officeDepartment: OfficeDepartment) {
    this.store.dispatch(new fromOfficeDepartment.SetSelected({
      selected: { ...initialStateSelectedOfficeDepartment, selectedEntity: officeDepartment }
    }));
    this.store.dispatch(new fromCore.Go({
      path: ['office_department', officeDepartment.office_department_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromOfficeDepartment.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromOfficeDepartment.SetSelected({ selected: initialStateSelectedOfficeDepartment }));
    this.store.dispatch(new fromCore.Go({
      path: ['office_department']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromOfficeDepartment.ResetSearch());
  }

}
