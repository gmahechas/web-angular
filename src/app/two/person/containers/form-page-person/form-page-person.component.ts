
import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Person } from './../../models/person.model';
import { City } from './../../../../one/city/models/city.model';

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

  onStore({ person, city }: { person: Person, city: City }) {
    this.store.dispatch(new fromStore.StoreEntity({...person, city_id: city.city_id }));
  }

  onUpdate({ person, city }: { person: Person, city: City }) {
    this.store.dispatch(new fromStore.UpdateEntity({...person, city_id: city.city_id }));
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
