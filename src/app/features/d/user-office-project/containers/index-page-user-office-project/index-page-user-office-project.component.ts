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

  constructor(
    private store: Store<fromUserOfficeProject.State>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.suscription = this.route.paramMap.subscribe((paramsMap: ParamMap) => {

      const key = paramsMap.keys[0];

      switch (key) {
        case 'user_id':
        case 'office_id': {
          const user_office_id = paramsMap.get(paramsMap.keys[1]);
          setTimeout(() => {
            this.store.dispatch(new fromUserOfficeProject.LoadEntity({
              search: {
                user_office: {
                  user_office_id: +user_office_id
                }
              }
            }));
          });
          break;
        }
        case 'project_id': {
          const project_id = paramsMap.get(key);

          setTimeout(() => {
            this.store.dispatch(new fromUserOfficeProject.LoadEntity({
              search: {
                project: {
                  project_id: +project_id
                }
              }
            }));
          });
          break;
        }
      }

    });
  }

  onEdit(userOfficeProject: UserOfficeProject) {
    this.store.dispatch(new fromUserOfficeProject.UpdateEntity({ entity: userOfficeProject }));
  }

  onDelete(userOfficeProject: UserOfficeProject) {
    this.store.dispatch(new fromUserOfficeProject.DestroyEntity({ entity: userOfficeProject }));
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
    this.store.dispatch(new fromUserOfficeProject.Reset);
  }
}
