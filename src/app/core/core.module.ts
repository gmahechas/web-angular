import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { SharedModule } from '../shared/shared.module';

import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromServices from './services';
import * as fromGuards from './guards';
import * as fromInterceptors from './interceptors';

import { environment } from './../../environments/environment';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    SharedModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class CoreModule {
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink
  ) {
    apollo.create({
      link: httpLink.create({ uri: environment.apilUrl + environment.graphqlUrl }),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all'
        }
      }
    });
  }

  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        ...fromServices.services,
        ...fromGuards.guards,
        { provide: HTTP_INTERCEPTORS, useClass: fromInterceptors.TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: fromInterceptors.RefreshTokenInterceptor, multi: true },
      ],
    };
  }
}
