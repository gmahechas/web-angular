import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/b/estate/store';
import * as fromCore from '@web/app/core/store';

import { Estate } from '@web/app/features/b/estate/models/estate.model';

@Component({
  selector: 'app-form-page-estate',
  templateUrl: './form-page-estate.component.html',
  styles: []
})
export class FormPageEstateComponent implements OnInit {

  pending$ = this.store.pipe(select(fromStore.getPending));
  estate$ = this.store.pipe(select(fromStore.getSelectedByRouter));

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  onStore(estate: Estate) {
    this.store.dispatch(new fromStore.StoreEntity({ entity: estate }));
  }

  onUpdate(estate: Estate) {
    this.store.dispatch(new fromStore.UpdateEntity({ entity: estate }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['estate']
    }));
  }

  onDestroy(estate: Estate) {
    this.store.dispatch(new fromStore.DestroyEntity({ entity: estate }));
  }

}
