import { Injectable } from '@angular/core';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class LogoutAuthGQL extends Query<any> {

  document: DocumentNode = gql`
    query {
      logoutAuth
    }
  `;
}
