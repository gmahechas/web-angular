import { Injectable } from '@angular/core';

import * as fromGraphql from '@web/app/features/e/context/graphql';

import * as fromModels from '@web/app/features/e/context/models';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor(
    private contextPagination: fromGraphql.ContextPaginationGQL
  ) { }

  load(searchContext: fromModels.SearchContext) {
    return this.contextPagination.watch({
      ...searchContext.context,
      limit: searchContext.limit,
      page: searchContext.page
    }).valueChanges;
  }

}
