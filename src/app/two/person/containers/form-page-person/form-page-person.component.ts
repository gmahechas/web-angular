import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@app/app/two/person/store';
import * as fromCore from '@app/app/core/store';

import { Person } from '@app/app/two/person/models/person.model';

@Component({
  selector: 'app-form-page-person',
  templateUrl: './form-page-person.component.html',
  styles: []
})
export class FormPagePersonComponent implements OnInit {

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
