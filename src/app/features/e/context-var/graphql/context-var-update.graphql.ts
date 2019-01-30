import { Injectable } from '@angular/core';

import { UpdateContextVar } from '@web/app/features/e/context-var/models/update-context-var.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ContextVarUpdateGQL extends Mutation<UpdateContextVar> {

  document: DocumentNode = gql`
    mutation updateContextVar($context_var_id: ID!) {
      updateContextVar(context_var_id: $context_var_id) {
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
