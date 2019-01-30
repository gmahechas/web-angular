import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/e/context-var/graphql';

import * as fromModels from '@web/app/features/e/context-var/models';

@Injectable({
  providedIn: 'root'
})
export class ContextVarService {

  queryRef: QueryRef<fromModels.PaginationContextVar>;

  constructor(
    private contextVarPaginationGQL: fromGraphql.ContextVarPaginationGQL,
    private contextVarStoreGQL: fromGraphql.ContextVarStoreGQL,
    private contextVarUpdateGQL: fromGraphql.ContextVarUpdateGQL,
    private contextVarDestroyGQL: fromGraphql.ContextVarDestroyGQL
  ) { }

  load(searchContextVar: fromModels.SearchContextVar) {
    this.queryRef = this.contextVarPaginationGQL.watch({
      ...searchContextVar.context_var,
      context_id: (searchContextVar.context) ? searchContextVar.context.context_id : null,
      limit: searchContextVar.limit,
      page: searchContextVar.page
    });

    return this.queryRef.valueChanges;
  }

  store(contextVar: fromModels.ContextVar) {
    return this.contextVarStoreGQL.mutate(contextVar);
  }

  update(contextVar: fromModels.ContextVar) {
    return this.contextVarUpdateGQL.mutate(contextVar);
  }

  destroy(contextVar: fromModels.ContextVar) {
    return this.contextVarDestroyGQL.mutate(contextVar);
  }

  pagination(searchContextVar: fromModels.SearchContextVar) {

    return this.queryRef.fetchMore({
      query: this.contextVarPaginationGQL.document,
      variables: {
        context_var_id: searchContextVar.context_var.context_var_id,
        context_var_code: searchContextVar.context_var.context_var_code,
        context_var_type: searchContextVar.context_var.context_var_type,
        context_var_description: searchContextVar.context_var.context_var_description,
        context_id: (searchContextVar.context) ? searchContextVar.context.context_id : null,
        limit: searchContextVar.limit,
        page: searchContextVar.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return fetchMoreResult;
      }
    });
  }

}
