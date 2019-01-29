import { Injectable } from '@angular/core';

import * as fromGraphql from '@web/app/features/e/context-var/graphql';

import * as fromModels from '@web/app/features/e/context-var/models';

@Injectable({
  providedIn: 'root'
})
export class ContextVarService {

  constructor(
    private contextVarPaginationGQL: fromGraphql.ContextVarPaginationGQL
  ) { }

  load(searchContextVar: fromModels.SearchContextVar) {
    return this.contextVarPaginationGQL.watch({
      ...searchContextVar.context_var,
      context_id: (searchContextVar.context) ? searchContextVar.context.context_id : null,
      limit: searchContextVar.limit,
      page: searchContextVar.page
    }).valueChanges;
  }

}
