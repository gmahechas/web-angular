import { NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Store } from '@ngrx/store';
import * as fromCore from '../core/store';
import * as fromAuthActions from '../auth/store/actions';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { ApolloLink, from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import { environment } from './../../environments/environment';

@NgModule({
  imports: [
    ApolloModule,
    HttpLinkModule
  ],
  declarations: []
})
export class GraphqlModule {
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private store: Store<fromCore.State>
  ) {
    const http = httpLink.create({
      uri: environment.apilUrl + environment.graphqlUrl,
      method: 'POST'
    });

    const tokenMiddleware = new ApolloLink((operation, forward) => {
      const token = JSON.parse(localStorage.getItem('token'));
      operation.setContext({
        headers: new HttpHeaders().set('Authorization', token.token_type + ' ' + token.access_token || null)
      });
      return forward(operation);
    });

    const errorMiddleware = onError(({ graphQLErrors, networkError, operation, forward }) => {
      const token = JSON.parse(localStorage.getItem('token'));
      console.log('old->', token);

      if (networkError['status'] === 401) {
        this.store.dispatch(new fromAuthActions.RefreshToken(token));
      }

      const newToken = JSON.parse(localStorage.getItem('token'));
      console.log('new->', newToken);
    });

    apollo.create({
      link: from([/* errorMiddleware, tokenMiddleware,  */http]),
      cache: new InMemoryCache({
        addTypename: false
      }),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'network-only'
        }
      }
    });
  }
}
