import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/e/context/graphql';

import * as fromModels from '@web/app/features/e/context/models';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  queryRef: QueryRef<fromModels.PaginationContext>;

  constructor(
    private contextPaginationGQL: fromGraphql.ContextPaginationGQL,
    private contextStoreGQL: fromGraphql.ContextStoreGQL,
    private contextUpdateGQL: fromGraphql.ContextUpdateGQL,
    private contextDestroyGQL: fromGraphql.ContextDestroyGQL
  ) { }

  load(searchContext: fromModels.SearchContext) {
    this.queryRef = this.contextPaginationGQL.watch({
      ...searchContext.context,
      menu_id: (searchContext.menu) ? searchContext.menu.menu_id : null,
      limit: searchContext.limit,
      page: searchContext.page
    });

    return this.queryRef.valueChanges;
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

  pagination(searchContext: fromModels.SearchContext) {

    return this.queryRef.fetchMore({
      query: this.contextPaginationGQL.document,
      variables: {
        context_id: searchContext.context.context_id,
        context_description: searchContext.context.context_description,
        menu_id: (searchContext.menu) ? searchContext.menu.menu_id : null,
        limit: searchContext.limit,
        page: searchContext.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return Object.assign({}, prev, [prev, fetchMoreResult]);
      }
    });
  }

}
