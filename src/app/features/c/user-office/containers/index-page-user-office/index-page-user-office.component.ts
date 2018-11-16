import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/c/user-office/store';

import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';

@Component({
  selector: 'app-index-page-user-office',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './index-page-user-office.component.html',
  styles: []
})
export class IndexPageUserOfficeComponent implements OnInit, OnDestroy {

  data$ = this.store.pipe(select(fromStore.getAllEntities));

  constructor(
    private store: Store<fromStore.State>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.snapshot.paramMap.keys.forEach(key => {
      switch (key) {
        case 'user_id': {

          setTimeout(() => {
            this.store.dispatch(new fromStore.LoadEntity({
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
            this.store.dispatch(new fromStore.LoadEntity({
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
    this.store.dispatch(new fromStore.UpdateEntity({ entity: userOffice }));
  }

  onDelete(userOffice: UserOffice) {
    this.store.dispatch(new fromStore.DestroyEntity({ entity: userOffice }));
  }

  ngOnDestroy() {
    this.store.dispatch(new fromStore.ResetSearch());
  }
}
