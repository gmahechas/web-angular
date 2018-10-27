import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/two/person/store';
import * as fromCore from '@web/app/core/store';

import { Person } from '@web/app/two/person/models/person.model';
import { SearchPerson } from '@web/app/two/person/models/search-person.model';

@Component({
  selector: 'app-index-page-person',
  templateUrl: './index-page-person.component.html',
  styles: []
})
export class IndexPagePersonComponent implements OnInit {

  query$ = this.store.pipe(select(fromStore.getQuery));

  data$ = this.store.pipe(select(fromStore.getAllEntities));
  total$ = this.store.pipe(select(fromStore.getTotal));
  perPage$ = this.store.pipe(select(fromStore.getPerPage));
  from$ = this.store.pipe(select(fromStore.getFrom));
  to$ = this.store.pipe(select(fromStore.getTo));
  configTable: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.configTable = {
      dataKey: 'person_id',
      cols: [
        { fields: ['person_id'], header: ['person.model.person_id'], style: { 'width': '5%' } },
        { fields: ['person_business_type'], header: ['person.model.person_business_type'], style: { 'width': '15%' } },
        { fields: ['person_identification_type'], header: ['person.model.person_identification_type'], style: { 'width': '15%' } },
        { fields: ['person_identification'], header: ['person.model.person_identification'], style: { 'width': '20%' } },
        {
          fields: [
            'person_first_name',
            'person_second_name',
            'person_first_surname',
            'person_second_surname',
            'person_legal_name'
          ], header: ['person.model.person_name'], style: { 'width': '30%' }
        },
        { fields: ['city.city_name'], header: ['person.singular'], style: { 'width': '15%' } },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() { }

  onLoad(personSearch: SearchPerson) {
    this.store.dispatch(new fromStore.LoadEntity({
      search: {
        person: personSearch.person,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromCore.Go({
      path: ['person', 'create']
    }));
  }

  onEdit(person: Person) {
    this.store.dispatch(new fromCore.Go({
      path: ['person', person.person_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromStore.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['person']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromStore.ResetSearch());
  }
}
