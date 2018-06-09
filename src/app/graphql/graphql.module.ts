import { NgModule } from '@angular/core';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

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
    private httpLink: HttpLink
  ) {
    apollo.create({
      link: httpLink.create({
        uri: environment.apilUrl + environment.graphqlUrl
      }),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'network-only'
        }
      }
    });
  }
}
