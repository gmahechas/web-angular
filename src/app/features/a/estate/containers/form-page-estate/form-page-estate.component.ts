import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromEstate from '@web/app/features/a/estate/store';
import * as fromCore from '@web/app/core/store';

import { Estate } from '@web/app/features/a/estate/models/estate.model';

@Component({
  selector: 'app-form-page-estate',
  templateUrl: './form-page-estate.component.html',
  styles: []
})
export class FormPageEstateComponent implements OnInit {

  pending$ = this.store.pipe(select(fromEstate.getPending));
  estate$ = this.store.pipe(select(fromEstate.getSelectedByRouter));

  constructor(
    private store: Store<fromEstate.State>
  ) { }

  ngOnInit() {
  }

  onStore(estate: Estate) {
    this.store.dispatch(new fromEstate.StoreEntity({ entity: estate }));
  }

  onUpdate(estate: Estate) {
    this.store.dispatch(new fromEstate.UpdateEntity({ entity: estate }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['estate']
    }));
  }

  onDestroy(estate: Estate) {
    this.store.dispatch(new fromEstate.DestroyEntity({ entity: estate }));
  }

}
