import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Person } from './../../models/person.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-page-person',
  templateUrl: './form-page-person.component.html',
  styles: []
})
export class FormPagePersonComponent implements OnInit {

  person$: Observable<Person>;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.person$ = store.pipe(select(fromStore.getSelectedByRouter));
  }

  ngOnInit() {
  }

  onStore(person: Person) {
    this.store.dispatch(new fromStore.StoreEntity(person));
  }

  onUpdate(person: Person) {
    this.store.dispatch(new fromStore.UpdateEntity(person));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['person']
    }));
  }

  onDestroy(person: Person) {
    this.store.dispatch(new fromStore.DestroyEntity(person));
  }
}
