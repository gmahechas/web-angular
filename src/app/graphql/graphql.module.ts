import { NgModule } from '@angular/core';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { environment } from '@web/environments/environment';

export function createApollo(httpLink: HttpLink) {
  const link = httpLink.create({ uri: environment.apilUrl + environment.graphqlUrl });
  return {
    link: link,
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
