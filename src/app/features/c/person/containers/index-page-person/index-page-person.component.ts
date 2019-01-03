import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromPerson from '@web/app/features/c/person/store';
import * as fromCore from '@web/app/core/store';

import { Person } from '@web/app/features/c/person/models/person.model';
import { SearchPerson } from '@web/app/features/c/person/models/search-person.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-person',
  templateUrl: './index-page-person.component.html',
  styles: []
})
export class IndexPagePersonComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selected: any;

  query$ = this.store.pipe(select(fromPerson.getQuery), take(1));

  data$ = this.store.pipe(select(fromPerson.getAllEntities));
  total$ = this.store.pipe(select(fromPerson.getTotal));
  perPage$ = this.store.pipe(select(fromPerson.getPerPage));
  from$ = this.store.pipe(select(fromPerson.getFrom));
  to$ = this.store.pipe(select(fromPerson.getTo));
  configTable: any;

  constructor(
    private store: Store<fromPerson.State>
  ) {
    this.configTable = {
      dataKey: 'person_id',
      cols: [
        { fields: ['person_id'], header: ['person.model.person_id'], style: { width: '5%' } },
        { fields: ['person_identification'], header: ['person.model.person_identification'], style: { width: '25%' } },
        {
          fields: [
            'person_first_name',
            'person_second_name',
            'person_first_surname',
            'person_second_surname',
            'person_legal_name'
          ], header: ['person.model.person_name'], style: { 'width': '70%' }
        },

      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(fromPerson.getSelectedEntity), take(1)).subscribe(
      (person: Person) => {
        if (person) {
          this.selected = person;
          this.store.dispatch(new fromCore.Go({
            path: ['person', person.person_id]
          }));
        }
      }
    );
  }

  onLoad(personSearch: SearchPerson) {
    this.store.dispatch(new fromPerson.LoadEntity({
      search: {
        person: personSearch.person,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromPerson.SelectEntity({ entity: null }));
    this.store.dispatch(new fromCore.Go({
      path: ['person', 'create']
    }));
  }

  onEdit(person: Person) {
    this.store.dispatch(new fromPerson.SelectEntity({ entity: person }));
    this.store.dispatch(new fromCore.Go({
      path: ['person', person.person_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromPerson.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromPerson.SelectEntity({ entity: null }));
    this.store.dispatch(new fromCore.Go({
      path: ['person']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromPerson.ResetSearch());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
