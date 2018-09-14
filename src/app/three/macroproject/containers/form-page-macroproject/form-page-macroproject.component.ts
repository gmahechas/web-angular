import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Macroproject } from './../../models/macroproject.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-page-macroproject',
  templateUrl: './form-page-macroproject.component.html',
  styles: []
})
export class FormPageMacroprojectComponent implements OnInit {

  macroproject$: Observable<Macroproject>;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.macroproject$ = store.pipe(select(fromStore.getSelectedByRouter));
  }

  ngOnInit() {
  }

  onStore(macroproject: Macroproject) {
    this.store.dispatch(new fromStore.StoreEntity(macroproject));
  }

  onUpdate(macroproject: Macroproject) {
    this.store.dispatch(new fromStore.UpdateEntity(macroproject));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['macroproject']
    }));
  }

  onDestroy(macroproject: Macroproject) {
    this.store.dispatch(new fromStore.DestroyEntity(macroproject));
  }
}
