import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/c/type-person-identification/graphql';

import * as fromModels from '@web/app/features/c/type-person-identification/models';

@Injectable({
  providedIn: 'root'
})
export class TypePersonIdentificationService {

  queryRef: QueryRef<fromModels.PaginationTypePersonIdentification>;

  constructor(
    private typePersonIdentificationPaginationGQL: fromGraphql.TypePersonIdentificationPaginationGQL,
    private typePersonIdentificationStoreGQL: fromGraphql.TypePersonIdentificationStoreGQL,
    private typePersonIdentificationUpdateGQL: fromGraphql.TypePersonIdentificationUpdateGQL,
    private typePersonIdentificationDestroyGQL: fromGraphql.TypePersonIdentificationDestroyGQL
  ) { }

  load(searchTypePersonIdentification: fromModels.SearchTypePersonIdentification) {
    this.queryRef = this.typePersonIdentificationPaginationGQL.watch({
      ...searchTypePersonIdentification.type_person_identification,
      limit: searchTypePersonIdentification.limit,
      page: searchTypePersonIdentification.page
    });

    return this.queryRef.valueChanges;
  }

  store(typePersonIdentification: fromModels.TypePersonIdentification) {
    return this.typePersonIdentificationStoreGQL.mutate(typePersonIdentification);
  }

  update(typePersonIdentification: fromModels.TypePersonIdentification) {
    return this.typePersonIdentificationUpdateGQL.mutate(typePersonIdentification);
  }

  destroy(typePersonIdentification: fromModels.TypePersonIdentification) {
    return this.typePersonIdentificationDestroyGQL.mutate(typePersonIdentification);
  }

  pagination(searchTypePersonIdentification: fromModels.SearchTypePersonIdentification) {

    return this.queryRef.fetchMore({
      query: this.typePersonIdentificationPaginationGQL.document,
      variables: {
        type_person_identification_id: searchTypePersonIdentification.type_person_identification.type_person_identification_id,
        type_person_identification_description:
          searchTypePersonIdentification.type_person_identification.type_person_identification_description,
        limit: searchTypePersonIdentification.limit,
        page: searchTypePersonIdentification.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return Object.assign({}, prev, [prev, fetchMoreResult]);
      }
    });
  }

}
