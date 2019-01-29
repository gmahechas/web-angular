import { Injectable } from '@angular/core';

import * as fromGraphql from '@web/app/features/e/context/graphql';

import * as fromModels from '@web/app/features/e/context/models';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor(
    private contextPaginationGQL: fromGraphql.ContextPaginationGQL
  ) { }

  load(searchContext: fromModels.SearchContext) {
    return this.contextPaginationGQL.watch({
      ...searchContext.context,
      limit: searchContext.limit,
      page: searchContext.page
    }).valueChanges;
  }

}
