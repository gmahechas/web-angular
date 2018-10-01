import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';

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
          this.store.dispatch(new fromStore.LoadEntity({
            search: {
              user: {
                user_id: this.route.snapshot.params[key]
              }
            }
          }));
          break;
        }
        case 'office_id': {
          this.store.dispatch(new fromStore.LoadEntity({
            search: {
              office: {
                office_id: this.route.snapshot.params[key]
              }
            }
          }));
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new fromStore.ResetSearch());
  }
}
