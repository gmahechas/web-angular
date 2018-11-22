import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromUserOffice from '@web/app/features/c/user-office/store';

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

  ngOnDestroy() {
    this.store.dispatch(new fromUserOffice.ResetSearch());
  }
}
