import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromUserOffice from '@web/app/features/c/user-office/store';
import * as fromCore from '@web/app/core/store';

import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';

@Component({
  selector: 'app-index-page-user-office',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './index-page-user-office.component.html',
  styles: []
})
export class IndexPageUserOfficeComponent implements OnInit, OnDestroy {

  data$ = this.store.pipe(select(fromUserOffice.getAllEntities));

  constructor(
    private store: Store<fromUserOffice.State>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    const key = this.route.snapshot.paramMap.keys[0];
    const val = this.route.snapshot.params[key];

    setTimeout(() => {
      this.store.dispatch(new fromUserOffice.LoadEntity({
        search: { [key.split('_')[0]]: { [key]: val } }
      }));
    });

  }

  onEdit(userOffice: UserOffice) {
    this.store.dispatch(new fromUserOffice.UpdateEntity({ entity: userOffice }));
  }

  onDelete(userOffice: UserOffice) {
    this.store.dispatch(new fromUserOffice.DestroyEntity({ entity: userOffice }));
  }

  onUserOfficeProject(userOffice: UserOffice) {

    const key = this.route.snapshot.paramMap.keys[0];

    this.store.dispatch(new fromCore.Go({
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
    this.store.dispatch(new fromUserOffice.ResetSearch());
  }
}
