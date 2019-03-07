import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromOfficeDepartment from '@web/app/features/b/office-department/store';
import * as fromOffice from '@web/app/features/b/office/store';
import * as fromDepartment from '@web/app/features/b/department/store';
import * as fromCore from '@web/app/core/store';

import { OfficeDepartment } from '@web/app/features/b/office-department/models/office-department.model';

@Component({
  selector: 'app-index-page-office-department',
  templateUrl: './index-page-office-department.component.html',
  styles: []
})
export class IndexPageOfficeDepartmentComponent implements OnInit, OnDestroy {

  pending$ = this.store.pipe(select(fromOfficeDepartment.getPending));
  data$ = this.store.pipe(select(fromOfficeDepartment.getAllEntities));
  office$ = this.store.pipe(select(fromOffice.getSelected));
  department$ = this.store.pipe(select(fromDepartment.getSelected));
  configTable: any;
  entityLabel: string;

  constructor(
    private store: Store<fromCore.State>,
    private route: ActivatedRoute
  ) {
    this.configTable = {
      dataKey: 'office_department_id',
      cols: [
        { fields: ['office.office_name'], header: ['office.model.office_name'], style: { width: '40%' } },
        { fields: ['department.department_name'], header: ['department.model.department_name'], style: { width: '40%' } },
      ],
      colSelection: [
        {
          type: 'checkbox',
          field: 'office_department_status',
          header: [],
          style: { width: '10%' }
        }
      ]
    };
  }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.keys[0];
    const val = this.route.snapshot.params[key];

    this.entityLabel = key.split('_')[0];

    setTimeout(() => {
      this.store.dispatch(new fromOfficeDepartment.LoadEntity({
        search: { [this.entityLabel]: { [key]: val } }
      }));
    });
  }

  handleColumnSelected({ column, event }) {
    switch (column) {
      case 0:
        this.onEdit({
          ...event,
          office_department_status: !event.office_department_status
        });
        break;
    }
  }

  onStore(officeDepartment: OfficeDepartment) {
    this.store.dispatch(new fromOfficeDepartment.StoreEntity({ entity: officeDepartment }));
    switch (this.entityLabel) {
      case 'office':
        this.store.dispatch(new fromDepartment.Reset({ redirect: false }));
        break;
      case 'department':
        this.store.dispatch(new fromOffice.Reset({ redirect: false }));
        break;
    }
  }

  onEdit(officeDepartment: OfficeDepartment) {
    this.store.dispatch(new fromOfficeDepartment.UpdateEntity({ entity: officeDepartment }));
  }

  ngOnDestroy() {
    this.store.dispatch(new fromOfficeDepartment.Reset({ redirect: false }));
  }

}
