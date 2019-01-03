import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromPerson from '@web/app/features/c/person/store';
import * as fromCore from '@web/app/core/store';

import { Person } from '@web/app/features/c/person/models/person.model';

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
    this.store.dispatch(new fromPerson.StoreEntity({ entity: person }));
  }

  onUpdate(person: Person) {
    this.store.dispatch(new fromPerson.UpdateEntity({ entity: person }));
  }

  onCancel() {
    this.store.dispatch(new fromPerson.SelectEntity({ entity: null }));
    this.store.dispatch(new fromCore.Go({
      path: ['person']
    }));
  }

  onDestroy(person: Person) {
    this.store.dispatch(new fromPerson.DestroyEntity({ entity: person }));
  }
}
