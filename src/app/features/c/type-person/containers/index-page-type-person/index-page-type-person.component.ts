import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromTypePerson from '@web/app/features/c/type-person/store';
import * as fromCore from '@web/app/core/store';

import { TypePerson } from '@web/app/features/c/type-person/models/type-person.model';
import { SearchTypePerson } from '@web/app/features/c/type-person/models/search-type-person.model';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-type-person',
  templateUrl: './index-page-type-person.component.html',
  styles: []
})
export class IndexPageTypePersonComponent implements OnInit {

  query$ = this.store.pipe(select(fromTypePerson.getQuery, take(1)));

  data$ = this.store.pipe(select(fromTypePerson.getAllEntities));
  total$ = this.store.pipe(select(fromTypePerson.getTotal));
  perPage$ = this.store.pipe(select(fromTypePerson.getPerPage));
  from$ = this.store.pipe(select(fromTypePerson.getFrom));
  to$ = this.store.pipe(select(fromTypePerson.getTo));
  configTable: any;

  constructor(
    private store: Store<fromTypePerson.State>
  ) {
    this.configTable = {
      dataKey: 'type_person_id',
      cols: [
        { fields: ['type_person_id'], header: ['type_person.model.type_person_id'], style: { width: '5%' } },
        { fields: ['type_person_code'], header: ['type_person.model.type_person_code'], style: { width: '25%' } },
        { fields: ['type_person_description'], header: ['type_person.model.type_person_description'], style: { width: '70%' } },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() { }

  onLoad(typePersonSearch: SearchTypePerson) {
    this.store.dispatch(new fromTypePerson.LoadEntity({
      search: {
        type_person: typePersonSearch.type_person,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromCore.Go({
      path: ['type_person', 'create']
    }));
  }

  onEdit(typePerson: TypePerson) {
    this.store.dispatch(new fromCore.Go({
      path: ['type_person', typePerson.type_person_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromTypePerson.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['type_person']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromTypePerson.ResetSearch());
  }
}
