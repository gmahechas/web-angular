import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@app/app/three/macroproject/store';
import * as fromCore from '@app/app/core/store';

import { Macroproject } from '@app/app/three/macroproject/models/macroproject.model';

@Component({
  selector: 'app-form-page-macroproject',
  templateUrl: './form-page-macroproject.component.html',
  styles: []
})
export class FormPageMacroprojectComponent implements OnInit {

  macroproject$ = this.store.pipe(select(fromStore.getSelectedByRouter));

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  onStore(macroproject: Macroproject) {
    this.store.dispatch(new fromStore.StoreEntity({ entity: macroproject }));
  }

  onUpdate(macroproject: Macroproject) {
    this.store.dispatch(new fromStore.UpdateEntity({ entity: macroproject }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['macroproject']
    }));
  }

  onDestroy(macroproject: Macroproject) {
    this.store.dispatch(new fromStore.DestroyEntity({ entity: macroproject }));
  }
}
