import { Injectable } from '@angular/core';

import { Apollo, QueryRef } from 'apollo-angular';
import * as fromGraphql from './../graphql/macroproject.graphql';

import * as fromModels from './../models';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MacroprojectService {

  queryRef: QueryRef<fromModels.PaginationMacroproject>;

  constructor(
    private apollo: Apollo
  ) { }

  load(searchMacroproject: fromModels.SearchMacroproject) {
    this.queryRef = this.apollo.watchQuery<fromModels.PaginationMacroproject, fromModels.SearchMacroproject>({
      query: fromGraphql.pagination,
      variables: {
        ...searchMacroproject.macroproject,
        city_id: (searchMacroproject.city) ? searchMacroproject.city.city_id :  null,
        office_id: (searchMacroproject.office) ? searchMacroproject.office.office_id :  null,
        limit: searchMacroproject.limit,
        page: searchMacroproject.page
      }
    });

    return this.queryRef.valueChanges;
  }

  store(macroproject: fromModels.Macroproject): Observable<any> {
    return this.apollo.mutate<fromModels.StoreMacroproject>({
      mutation: fromGraphql.store,
      variables: macroproject
    });
  }

  update(macroproject: fromModels.Macroproject): Observable<any> {
    return this.apollo.mutate<fromModels.UpdateMacroproject>({
      mutation: fromGraphql.update,
      variables: macroproject
    });
  }

  destroy(macroproject: fromModels.Macroproject): Observable<any> {
    return this.apollo.mutate<fromModels.DestroyMacroproject>({
      mutation: fromGraphql.destroy,
      variables: {
        macroproject_id: macroproject.macroproject_id
      }
    });
  }

  pagination(searchMacroproject: fromModels.SearchMacroproject) {
    return this.queryRef.fetchMore({
      query: fromGraphql.pagination,
      variables: {
        macroproject_id: searchMacroproject.macroproject.macroproject_id,
        macroproject_name: searchMacroproject.macroproject.macroproject_name,
        city_id: (searchMacroproject.city) ? searchMacroproject.city.city_id : null,
        office_id: (searchMacroproject.office) ? searchMacroproject.office.office_id : null,
        limit: searchMacroproject.limit,
        page: searchMacroproject.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return fetchMoreResult;
      }
    });
  }

}
