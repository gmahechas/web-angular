import { NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, from } from 'apollo-link';
import { onError } from 'apollo-link-error';

import { Token } from '@web/app/auth/models/token.model';

import { environment } from '@web/environments/environment';

const tokenMiddleware = new ApolloLink((operation, forward) => {
  const token: Token = JSON.parse(localStorage.getItem('mavatec'));
  operation.setContext({
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token.token_type.concat(' ', token.access_token),
    })
  });
  return forward(operation);
});

const refreshTokenMiddleware = onError(({ graphQLErrors, networkError, operation, forward }) => {
  // console.log('Error:::', { graphQLErrors, networkError, operation, forward });
});

export function createApollo(httpLink: HttpLink) {
  const link = httpLink.create({ uri: environment.apilUrl + environment.graphqlUrl });
  return {
    link: from([
      tokenMiddleware,
      /* refreshTokenMiddleware, */
      link
    ]),
    cache: new InMemoryCache({
      addTypename: false
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only'
      }
    }
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ]
})
export class GraphqlModule { }
