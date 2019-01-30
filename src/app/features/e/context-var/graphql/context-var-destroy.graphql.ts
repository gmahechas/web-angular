import { Injectable } from '@angular/core';

import { DestroyContextVar } from '@web/app/features/e/context-var/models/destroy-context-var.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ContextVarDestroyGQL extends Mutation<DestroyContextVar> {

  document: DocumentNode = gql`
    mutation destroyContextVar($context_var_id: ID!) {
      destroyContextVar(context_var_id: $context_var_id) {
        context_var_id
        context_var_code
        context_var_type
        context_var_description
        context_var_order
        context_id
      }
    }
  `;

}
