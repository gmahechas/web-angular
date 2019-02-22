import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromUserOfficeProject from '@web/app/features/d/user-office-project/store';

import { UserOfficeProject } from '@web/app/features/d/user-office-project/models/user-office-project.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index-page-user-office-project',
  templateUrl: './index-page-user-office-project.component.html',
  styles: []
})
export class IndexPageUserOfficeProjectComponent implements OnInit, OnDestroy {

  data$ = this.store.pipe(select(fromUserOfficeProject.getAllEntities));
  suscription: Subscription;
  configTable: any;

  constructor(
    private store: Store<fromUserOfficeProject.State>,
    private route: ActivatedRoute
  ) {
    this.configTable = {
      dataKey: 'user_office_project_id',
      cols: [
        { fields: ['project.project_name'], header: ['project.singular'], style: { width: '45%' } },
        { fields: ['user_office.user.username'], header: ['user.model.username'], style: { width: '45%' } },
      ],
      colSelection: [
        {
          type: 'checkbox',
          field: 'user_office_project_status',
          header: [],
          style: { width: '10%' }
        },
      ]
    };
  }

  ngOnInit() {

    this.suscription = this.route.paramMap.subscribe((paramsMap: ParamMap) => {

      const key = paramsMap.keys[0];

      switch (key) {
        case 'user_id':
        case 'office_id': {
          const userOfficeId = paramsMap.get(paramsMap.keys[1]);
          setTimeout(() => {
            this.store.dispatch(new fromUserOfficeProject.LoadEntity({
              search: {
                user_office: {
                  user_office_id: +userOfficeId
                }
              }
            }));
          });
          break;
        }
        case 'project_id': {
          const projectId = paramsMap.get(key);

          setTimeout(() => {
            this.store.dispatch(new fromUserOfficeProject.LoadEntity({
              search: {
                project: {
                  project_id: +projectId
                }
              }
            }));
          });
          break;
        }
      }

    });
  }

  handleColumnSelected({ column, event }) {
    switch (column) {
      case 0:
        this.onEdit({
          ...event,
          user_office_project_status: !event.user_office_project_status
        });
        break;
    }
  }

  onEdit(userOfficeProject: UserOfficeProject) {
    this.store.dispatch(new fromUserOfficeProject.UpdateEntity({ entity: userOfficeProject }));
  }

  onDelete(userOfficeProject: UserOfficeProject) {
    this.store.dispatch(new fromUserOfficeProject.DestroyEntity({ entity: userOfficeProject }));
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
    this.store.dispatch(new fromUserOfficeProject.Reset({ redirect: true }));
  }
}
