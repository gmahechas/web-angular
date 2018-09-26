import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Person } from './../../models/person.model';
import { SearchPerson } from './../../models/search-person.model';

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
        { fields: ['person_id'], header: 'Id', style: { 'width': '5%' } },
        { fields: ['person_business_type'], header: 'Tipo', style: { 'width': '5%' } },
        { fields: ['person_identification_type'], header: 'Tipo Ident', style: { 'width': '5%' } },
        { fields: ['person_identification'], header: 'Identificacion', style: { 'width': '20%' } },
        {
          fields: [
            'person_first_name',
            'person_second_name',
            'person_first_surname',
            'person_second_surname',
            'person_legal_name'
          ], header: 'Nombres', style: { 'width': '50%' }
        },
        { fields: ['city.city_name'], header: 'Ciudad', style: { 'width': '15%' } },
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

}
