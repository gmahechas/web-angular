import { Injectable } from '@angular/core';

import { PaginationContextVar } from '@web/app/features/e/context-var/models/pagination-context-var.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ContextVarPaginationGQL extends Query<PaginationContextVar> {

  document: DocumentNode = gql`
    query paginationContextVar(
      $context_var_id: ID,
      $context_var_code: String,
      $context_var_type: String,
      $context_var_description: String,
      $context_id: ID,
      $limit: Int,
      $page: Int
    ) {
      paginationContextVar(
        context_var_id: $context_var_id,
        context_var_code: $context_var_code,
        context_var_type: $context_var_type,
        context_var_description: $context_var_description,
        context_id: $context_id,
        limit: $limit,
        page: $page
      ) {
        total
        per_page
        current_page
        from
        to
        data {
          context_var_id
          context_var_code
          context_var_type
          context_var_description
          context_var_order
          context_id
        }
      }
    }
  `;
}
