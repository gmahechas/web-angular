import { Injectable } from '@angular/core';

import { UpdateContext } from '@web/app/features/e/context/models/update-context.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ContextUpdateGQL extends Mutation<UpdateContext> {

  document: DocumentNode = gql`
    mutation updateContext(
      $context_id: ID!,
      $context_description: String,
      $menu_id: ID
    ) {
      updateContext(
        context_id: $context_id,
        context_description: $context_description,
        menu_id: $menu_id
      ) {
        context_id
        context_description
        menu_id
      }
    }
  `;

}
