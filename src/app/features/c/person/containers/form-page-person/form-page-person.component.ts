import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromPerson from '@web/app/features/c/person/store';
import * as fromCore from '@web/app/core/store';

import { Person } from '@web/app/features/c/person/models/person.model';
import { initialStateSelectedPerson } from '@web/app/features/c/person/models/selected-person.model';

@Component({
  selector: 'app-form-page-person',
  templateUrl: './form-page-person.component.html',
  styles: []
})
export class FormPagePersonComponent implements OnInit {

  pending$ = this.store.pipe(select(fromPerson.getPending));
  person$ = this.store.pipe(select(fromPerson.getSelectedByRouter));

  constructor(
    private store: Store<fromPerson.State>
  ) { }

  ngOnInit() {
  }

  onStore(person: Person) {
    this.store.dispatch(fromPerson.EntityActions.StoreEntity({ entity: person }));
  }

  onUpdate(person: Person) {
    this.store.dispatch(fromPerson.EntityActions.UpdateEntity({ entity: person }));
  }

  onCancel() {
    this.store.dispatch(fromPerson.EntityActions.SetSelected({ selected: initialStateSelectedPerson }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['person']
    }));
  }

  onDestroy(person: Person) {
    this.store.dispatch(fromPerson.EntityActions.DestroyEntity({ entity: person }));
  }
}
