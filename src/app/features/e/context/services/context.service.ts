import { Injectable } from '@angular/core';

import * as fromGraphql from '@web/app/features/e/context/graphql';

import * as fromModels from '@web/app/features/e/context/models';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor(
    private contextPagination: fromGraphql.ContextPaginationGQL,
    private contextStoreGQL: fromGraphql.ContextStoreGQL,
    private contextUpdateGQL: fromGraphql.ContextUpdateGQL,
    private contextDestroyGQL: fromGraphql.ContextDestroyGQL
  ) { }

  load(searchContext: fromModels.SearchContext) {
    return this.contextPagination.watch({
      ...searchContext.context,
      limit: searchContext.limit,
      page: searchContext.page
    }).valueChanges;
  }

  store(context: fromModels.Context) {
    return this.contextStoreGQL.mutate(context);
  }

  update(context: fromModels.Context) {
    return this.contextUpdateGQL.mutate(context);
  }

  destroy(context: fromModels.Context) {
    return this.contextDestroyGQL.mutate(context);
  }

}
