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

  constructor(
    private store: Store<fromOfficeDepartment.State>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.keys[0];
    const val = this.route.snapshot.params[key];

    setTimeout(() => {
      this.store.dispatch(new fromOfficeDepartment.LoadEntity({
        search: { [key.split('_')[0]]: { [key]: val } }
      }));
    });
  }

  onEdit(officeDepartment: OfficeDepartment) {
    this.store.dispatch(new fromOfficeDepartment.UpdateEntity({ entity: officeDepartment }));
  }

  onDelete(officeDepartment: OfficeDepartment) {
    this.store.dispatch(new fromOfficeDepartment.DestroyEntity({ entity: officeDepartment }));
  }

  ngOnDestroy() {
    this.store.dispatch(new fromOfficeDepartment.Reset());
  }

}
