import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromUserOffice from '@web/app/features/c/user-office/store';
import * as fromOffice from '@web/app/features/b/office/store';
import * as fromUser from '@web/app/features/c/user/store';
import * as fromCore from '@web/app/core/store';

import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';

@Component({
  selector: 'app-index-page-user-office',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './index-page-user-office.component.html',
  styles: []
})
export class IndexPageUserOfficeComponent implements OnInit, OnDestroy {

  pending$ = this.store.pipe(select(fromUserOffice.getPending));
  data$ = this.store.pipe(select(fromUserOffice.getAllEntities));
  user$ = this.store.pipe(select(fromUser.getSelected));
  office$ = this.store.pipe(select(fromOffice.getSelected));
  configTable: any;
  entityLabel: string;

  constructor(
    private store: Store<fromCore.State>,
    private route: ActivatedRoute
  ) {
    this.configTable = {
      dataKey: 'user_office_id',
      cols: [
        { fields: ['office.office_name'], header: ['office.model.office_name'], style: { width: '35%' } },
        { fields: ['user.username'], header: ['user.model.username'], style: { width: '35%' } },
      ],
      colSelection: [
        {
          type: 'checkbox',
          field: 'user_office_status',
          header: [],
          style: { width: '10%' }
        },
        {
          type: 'button',
          header: [],
          label: ['project.plural'],
          style: { width: '20%' }
        }
      ]
    };
  }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.keys[0];
    const val = this.route.snapshot.params[key];

    this.entityLabel = key.split('_')[0];

    setTimeout(() => {
      this.store.dispatch(fromUserOffice.EntityActions.LoadEntity({
        search: { [this.entityLabel]: { [key]: val } }
      }));
    });
  }

  handleColumnSelected({ column, event }) {
    switch (column) {
      case 0:
        this.onEdit({
          ...event,
          user_office_status: !event.user_office_status
        });
        break;
      case 1:
        this.onUserOfficeProject(event);
        break;

    }
  }

  onStore(userOffice: UserOffice) {
    this.store.dispatch(fromUserOffice.EntityActions.StoreEntity({ entity: userOffice }));
    switch (this.entityLabel) {
      case 'user':
        this.store.dispatch(fromOffice.EntityActions.Reset({ redirect: false }));
        break;
      case 'office':
        this.store.dispatch(fromUser.EntityActions.Reset({ redirect: false }));
        break;
    }
  }

  onEdit(userOffice: UserOffice) {
    this.store.dispatch(fromUserOffice.EntityActions.UpdateEntity({ entity: userOffice }));
  }

  onDelete(userOffice: UserOffice) {
    this.store.dispatch(fromUserOffice.EntityActions.DestroyEntity({ entity: userOffice }));
  }

  onUserOfficeProject(userOffice: UserOffice) {

    this.store.dispatch(fromUserOffice.EntityActions.SetSelected({
      selected: { selectedEntity: userOffice }
    }));

    const key = this.route.snapshot.paramMap.keys[0];

    this.store.dispatch(fromCore.RouterActions.Go({
      path: [
        key.split('_')[0], userOffice[key],
        {
          outlets: {
            'router-outlet-user-office': ['user-office', key.split('_')[0], userOffice[key], {
              outlets: {
                'router-outlet-user-office-project':
                  ['user-office-project', key.split('_')[0], userOffice[key], userOffice.user_office_id]
              }
            }],
          }
        }
      ]
    }));

  }

  ngOnDestroy() {
    this.store.dispatch(fromUserOffice.EntityActions.Reset({ redirect: false }));
  }
}
