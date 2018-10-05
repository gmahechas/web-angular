import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@app/app/three/macroproject/graphql';

import * as fromModels from '@app/app/three/macroproject/models';

@Injectable({
  providedIn: 'root'
})
export class MacroprojectService {

  queryRef: QueryRef<fromModels.PaginationMacroproject>;

  constructor(
    private macroprojectPagination: fromGraphql.MacroprojectPaginationGQL,
    private macroprojectStoreGQL: fromGraphql.MacroprojectStoreGQL,
    private macroprojectUpdateGQL: fromGraphql.MacroprojectUpdateGQL,
    private macroprojectDestroyGQL: fromGraphql.MacroprojectDestroyGQL
  ) { }

  load(searchMacroproject: fromModels.SearchMacroproject) {
    return this.macroprojectPagination.watch({
      ...searchMacroproject.macroproject,
      city_id: (searchMacroproject.city) ? searchMacroproject.city.city_id : null,
      office_id: (searchMacroproject.office) ? searchMacroproject.office.office_id : null,
      limit: searchMacroproject.limit,
      page: searchMacroproject.page
    }).valueChanges;
  }

  store(macroproject: fromModels.Macroproject) {
    return this.macroprojectStoreGQL.mutate(macroproject);
  }

  update(macroproject: fromModels.Macroproject) {
    return this.macroprojectUpdateGQL.mutate(macroproject);
  }

  destroy(macroproject: fromModels.Macroproject) {
    return this.macroprojectDestroyGQL.mutate(macroproject);
  }

  pagination(searchMacroproject: fromModels.SearchMacroproject) {
    return this.queryRef.fetchMore({
      query: this.macroprojectPagination.document,
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
