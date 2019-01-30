import { Injectable } from '@angular/core';

import { StoreContext } from '@web/app/features/e/context/models/store-context.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ContextStoreGQL extends Mutation<StoreContext> {

  document: DocumentNode = gql`
    mutation storeContext($context_description: String) {
      storeContext(context_description: $context_description) {
        context_id
        context_description
        menu_id
      }
    }
  `;

}
