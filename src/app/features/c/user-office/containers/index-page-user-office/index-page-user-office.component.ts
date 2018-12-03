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
    this.route.snapshot.paramMap.keys.forEach(key => {
      switch (key) {
        case 'user_id': {

          setTimeout(() => {
            this.store.dispatch(new fromUserOffice.LoadEntity({
              search: {
                user: {
                  user_id: this.route.snapshot.params[key]
                }
              }
            }));
          });
          break;
        }
        case 'office_id': {
          setTimeout(() => {
            this.store.dispatch(new fromUserOffice.LoadEntity({
              search: {
                office: {
                  office_id: this.route.snapshot.params[key]
                }
              }
            }));
          });
          break;
        }
      }
    });
  }

  onEdit(userOffice: UserOffice) {
    this.store.dispatch(new fromUserOffice.UpdateEntity({ entity: userOffice }));
  }

  onDelete(userOffice: UserOffice) {
    this.store.dispatch(new fromUserOffice.DestroyEntity({ entity: userOffice }));
  }

  onUserOfficeProject(userOffice: UserOffice) {

    this.route.snapshot.paramMap.keys.forEach(key => {
      switch (key) {
        case 'user_id': {
          this.store.dispatch(new fromCore.Go({
            path: [
              'user', userOffice.user_id,
              {
                outlets: {
                  'router-outlet-user-office': ['user-office', 'user', userOffice.user_id, {
                    outlets: {
                      'router-outlet-user-office-project':
                        ['user-office-project', 'user', userOffice.user_id, userOffice.user_office_id]
                    }
                  }],
                }
              }
            ]
          }));
          break;
        }
        case 'office_id': {
          this.store.dispatch(new fromCore.Go({
            path: [
              'office', userOffice.office_id,
              {
                outlets: {
                  'router-outlet-user-office': ['user-office', 'office', userOffice.office_id, {
                    outlets: {
                      'router-outlet-user-office-project':
                        ['user-office-project', 'office', userOffice.office_id, userOffice.user_office_id]
                    }
                  }],
                }
              }
            ]
          }));
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new fromUserOffice.ResetSearch());
  }
}
