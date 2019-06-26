import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromTypePerson from '@web/app/features/c/type-person/store';
import * as fromCore from '@web/app/core/store';

import { TypePerson } from '@web/app/features/c/type-person/models/type-person.model';
import { initialStateSelectedTypePerson } from '@web/app/features/c/type-person/models/selected-type-person.model';

@Component({
  selector: 'app-form-page-type-person',
  templateUrl: './form-page-type-person.component.html',
  styles: []
})
export class FormPageTypePersonComponent implements OnInit {

  pending$ = this.store.pipe(select(fromTypePerson.getPending));
  typePerson$ = this.store.pipe(select(fromTypePerson.getSelectedByRouter));

  constructor(
    private store: Store<fromTypePerson.State>
  ) { }

  ngOnInit() {
  }

  onStore(typePerson: TypePerson) {
    this.store.dispatch(fromTypePerson.EntityActions.StoreEntity({ entity: typePerson }));
  }

  onUpdate(typePerson: TypePerson) {
    this.store.dispatch(fromTypePerson.EntityActions.UpdateEntity({ entity: typePerson }));
  }

  onCancel() {
    this.store.dispatch(fromTypePerson.EntityActions.SetSelected({ selected: initialStateSelectedTypePerson }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['typePerson']
    }));
  }

  onDestroy(typePerson: TypePerson) {
    this.store.dispatch(fromTypePerson.EntityActions.DestroyEntity({ entity: typePerson }));
  }
}
