import { Injectable } from '@angular/core';

import { DestroyContext } from '@web/app/features/e/context/models/destroy-context.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ContextDestroyGQL extends Mutation<DestroyContext> {

  document: DocumentNode = gql`
    mutation destroyContext($context_id: ID!) {
      destroyContext(context_id: $context_id) {
        context_id
        context_description
        menu_id
      }
    }
  `;

}
