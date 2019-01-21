import { Injectable } from '@angular/core';

import { PaginationContext } from '@web/app/features/e/context/models/pagination-context.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ContextPaginationGQL extends Query<PaginationContext> {

  document: DocumentNode = gql`
    query paginationContext(
      $context_id: ID,
      $context_description: String,
      $menu_id: ID,
      $limit: Int,
      $page: Int
    ) {
      paginationContext(
        context_id: $context_id,
        context_description: $context_description,
        menu_id: $menu_id,
        limit: $limit,
        page: $page
      ) {
        total
        per_page
        current_page
        from
        to
        data {
          context_id
          context_description
          menu_id
        }
      }
    }
  `;
}
