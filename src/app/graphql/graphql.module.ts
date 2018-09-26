import { NgModule } from '@angular/core';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, from } from 'apollo-link';
import { onError } from 'apollo-link-error';

import { environment } from './../../environments/environment';

const tokenMiddleware = new ApolloLink((operation, forward) => {
  // console.log(operation);
  return forward(operation);
});

const errorMiddleware = onError(({ graphQLErrors, networkError, operation, forward }) => {
  // console.log('Error:::', { graphQLErrors, networkError, operation, forward });
});

export function createApollo(httpLink: HttpLink) {
  const link = httpLink.create({ uri: environment.apilUrl + environment.graphqlUrl });
  return {
    link: from([
/*       tokenMiddleware,
      errorMiddleware, */
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
