import { Injectable } from '@angular/core';

import * as fromGraphql from './../graphql';

import * as fromModels from './../models';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private personPagination: fromGraphql.PersonPaginationGQL,
    private personStoreGQL: fromGraphql.PersonStoreGQL,
    private personUpdateGQL: fromGraphql.PersonUpdateGQL,
    private personDestroyGQL: fromGraphql.PersonDestroyGQL
  ) { }

  load(searchPerson: fromModels.SearchPerson) {
    return this.personPagination.watch({
      ...searchPerson.person,
      limit: searchPerson.limit,
      page: searchPerson.page
    }).valueChanges;
  }

  store(person: fromModels.Person) {
    return this.personStoreGQL.mutate(person);
  }

  update(person: fromModels.Person) {
    return this.personUpdateGQL.mutate(person);
  }

  destroy(person: fromModels.Person) {
    return this.personDestroyGQL.mutate(person);
  }

  pagination(searchPerson: fromModels.SearchPerson) {
    return this.personPagination.fetch({
      person_id: searchPerson.person.person_id,
      person_identification: searchPerson.person.person_identification,
      person_names: searchPerson.person.person_names,
      limit: searchPerson.limit,
      page: searchPerson.page
    });
  }

}
