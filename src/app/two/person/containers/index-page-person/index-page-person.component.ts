import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Person } from './../../models/person.model';
import { SearchPerson } from './../../models/search-person.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-index-page-person',
  templateUrl: './index-page-person.component.html',
  styles: []
})
export class IndexPagePersonComponent implements OnInit {

  query$: Observable<SearchPerson>;

  data$: Observable<Person[]>;
  total$: Observable<number>;
  perPage$: Observable<number>;
  from$: Observable<number>;
  to$: Observable<number>;
  configTable: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.data$ = store.pipe(select(fromStore.getAllEntities));
    this.query$ = store.pipe(select(fromStore.getQuery));
    this.total$ = store.pipe(select(fromStore.getTotal));
    this.perPage$ = store.pipe(select(fromStore.getPerPage));
    this.from$ = store.pipe(select(fromStore.getFrom));
    this.to$ = store.pipe(select(fromStore.getTo));
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
      ]
    };
  }

  ngOnInit() { }

  onLoad(personSearch: SearchPerson) {
    this.store.dispatch(new fromStore.LoadEntity({
      person: personSearch.person,
      limit: 20,
      page: 1
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
    this.store.dispatch(new fromStore.PaginateEntity(event.page + 1));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['person']
    }));
  }

}
