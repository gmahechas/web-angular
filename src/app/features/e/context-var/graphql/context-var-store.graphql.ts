import { Injectable } from '@angular/core';

import { StoreContextVar } from '@web/app/features/e/context-var/models/store-context-var.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ContextVarStoreGQL extends Mutation<StoreContextVar> {

  document: DocumentNode = gql`
    mutation storeContextVar(
      $context_var_code: String,
      $context_var_type: String,
      $context_var_description: String,
      $context_var_order: Int,
      $context_id: ID!
    ) {
      storeContextVar(
        context_var_code: $context_var_code,
        context_var_type: $context_var_type,
        context_var_description: $context_var_description,
        context_var_order: $context_var_order,
        context_id: $context_id
      ) {
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
