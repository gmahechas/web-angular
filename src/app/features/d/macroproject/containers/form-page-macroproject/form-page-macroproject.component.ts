import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromMacroproject from '@web/app/features/d/macroproject/store';
import * as fromCore from '@web/app/core/store';

import { Macroproject } from '@web/app/features/d/macroproject/models/macroproject.model';
import { initialStateSelectedMacroproject } from '@web/app/features/d/macroproject/models/selected-macroproject.model';

@Component({
  selector: 'app-form-page-macroproject',
  templateUrl: './form-page-macroproject.component.html',
  styles: []
})
export class FormPageMacroprojectComponent implements OnInit {

  pending$ = this.store.pipe(select(fromMacroproject.getPending));
  macroproject$ = this.store.pipe(select(fromMacroproject.getSelectedByRouter));

  constructor(
    private store: Store<fromMacroproject.State>
  ) { }

  ngOnInit() {
  }

  onStore(macroproject: Macroproject) {
    this.store.dispatch(fromMacroproject.EntityActions.StoreEntity({ entity: macroproject }));
  }

  onUpdate(macroproject: Macroproject) {
    this.store.dispatch(fromMacroproject.EntityActions.UpdateEntity({ entity: macroproject }));
  }

  onCancel() {
    this.store.dispatch(fromMacroproject.EntityActions.SetSelected({ selected: initialStateSelectedMacroproject }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['macroproject']
    }));
  }

  onDestroy(macroproject: Macroproject) {
    this.store.dispatch(fromMacroproject.EntityActions.DestroyEntity({ entity: macroproject }));
  }
}
