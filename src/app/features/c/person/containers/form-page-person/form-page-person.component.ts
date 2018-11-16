import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/c/person/store';
import * as fromCore from '@web/app/core/store';

import { Person } from '@web/app/features/c/person/models/person.model';

@Component({
  selector: 'app-form-page-person',
  templateUrl: './form-page-person.component.html',
  styles: []
})
export class FormPagePersonComponent implements OnInit {

  pending$ = this.store.pipe(select(fromStore.getPending));
  person$ = this.store.pipe(select(fromStore.getSelectedByRouter));

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  onStore(person: Person) {
    this.store.dispatch(new fromStore.StoreEntity({ entity: person }));
  }

  onUpdate(person: Person) {
    this.store.dispatch(new fromStore.UpdateEntity({ entity: person }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['person']
    }));
  }

  onDestroy(person: Person) {
    this.store.dispatch(new fromStore.DestroyEntity({ entity: person }));
  }
}
