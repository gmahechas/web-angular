import { Injectable } from '@angular/core';

import * as fromGraphql from '@web/app/features/c/type-person/graphql';

import * as fromModels from '@web/app/features/c/type-person/models';

@Injectable({
  providedIn: 'root'
})
export class TypePersonService {

  constructor(
    private typePersonPaginationGQL: fromGraphql.TypePersonPaginationGQL,
    private typePersonStoreGQL: fromGraphql.TypePersonStoreGQL,
    private typePersonUpdateGQL: fromGraphql.TypePersonUpdateGQL,
    private typePersonDestroyGQL: fromGraphql.TypePersonDestroyGQL
  ) { }

  load(searchTypePerson: fromModels.SearchTypePerson) {
    return this.typePersonPaginationGQL.watch({
      ...searchTypePerson.type_person,
      limit: searchTypePerson.limit,
      page: searchTypePerson.page
    }).valueChanges;
  }

  store(typePerson: fromModels.TypePerson) {
    return this.typePersonStoreGQL.mutate(typePerson);
  }

  update(typePerson: fromModels.TypePerson) {
    return this.typePersonUpdateGQL.mutate(typePerson);
  }

  destroy(typePerson: fromModels.TypePerson) {
    return this.typePersonDestroyGQL.mutate(typePerson);
  }

  pagination(searchTypePerson: fromModels.SearchTypePerson) {
    return this.typePersonPaginationGQL.fetch({
      type_person_id: searchTypePerson.type_person.type_person_id,
      type_person_description: searchTypePerson.type_person.type_person_description,
      limit: searchTypePerson.limit,
      page: searchTypePerson.page
    });
  }

}
