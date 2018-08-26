import { Injectable } from '@angular/core';

import { Apollo, QueryRef } from 'apollo-angular';
import * as fromGraphql from './../graphql/person.graphql';

import * as fromModels from './../models';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  queryRef: QueryRef<fromModels.PaginationPerson>;

  constructor(
    private apollo: Apollo
  ) { }

  load(searchPerson: fromModels.SearchPerson) {
    this.queryRef = this.apollo.watchQuery<fromModels.PaginationPerson, fromModels.SearchPerson>({
      query: fromGraphql.pagination,
      variables: {
        ...searchPerson.person,
        limit: searchPerson.limit,
        page: searchPerson.page
      }
    });

    return this.queryRef.valueChanges;
  }

  store(person: fromModels.Person): Observable<any> {
    return this.apollo.mutate<fromModels.StorePerson>({
      mutation: fromGraphql.store,
      variables: person
    });
  }

  update(person: fromModels.Person): Observable<any> {
    return this.apollo.mutate<fromModels.UpdatePerson>({
      mutation: fromGraphql.update,
      variables: person
    });
  }

  destroy(person: fromModels.Person): Observable<any> {
    return this.apollo.mutate<fromModels.DestroyPerson>({
      mutation: fromGraphql.destroy,
      variables: {
        person_id: person.person_id
      }
    });
  }

  pagination(searchPerson: fromModels.SearchPerson) {
    return this.queryRef.fetchMore({
      query: fromGraphql.pagination,
      variables: {
        person_id: searchPerson.person.person_id,
        person_identification: searchPerson.person.person_identification,
        limit: searchPerson.limit,
        page: searchPerson.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return fetchMoreResult;
      }
    });
  }

}
