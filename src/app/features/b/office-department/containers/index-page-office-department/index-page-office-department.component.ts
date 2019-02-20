import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromOfficeDepartment from '@web/app/features/b/office-department/store';
import * as fromCore from '@web/app/core/store';

import { OfficeDepartment } from '@web/app/features/b/office-department/models/office-department.model';

@Component({
  selector: 'app-index-page-office-department',
  templateUrl: './index-page-office-department.component.html',
  styles: []
})
export class IndexPageOfficeDepartmentComponent implements OnInit, OnDestroy {

  data$ = this.store.pipe(select(fromOfficeDepartment.getAllEntities));
  configTable: any;

  constructor(
    private store: Store<fromOfficeDepartment.State>,
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

    setTimeout(() => {
      this.store.dispatch(new fromOfficeDepartment.LoadEntity({
        search: { [key.split('_')[0]]: { [key]: val } }
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

  onEdit(officeDepartment: OfficeDepartment) {
    this.store.dispatch(new fromOfficeDepartment.UpdateEntity({ entity: officeDepartment }));
  }

  ngOnDestroy() {
    this.store.dispatch(new fromOfficeDepartment.Reset());
  }

}
