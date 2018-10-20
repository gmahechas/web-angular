import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects, metaReducers } from '@web/app/core/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from '@web/app/shared/router-utils';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { GraphqlModule } from '@web/app/graphql/graphql.module';
import { SharedModule } from '@web/app/shared/shared.module';
import { AuthModule } from '@web/app/auth/auth.module';
import { AppRoutingModule } from '@web/app/app-routing.module';
import { CoreModule } from '@web/app/core/core.module';

import { TokenInterceptor } from '@web/app/auth/interceptors/token-interceptor';
import { RefreshTokenInterceptor } from '@web/app/auth/interceptors/refresh-token-interceptor';

import { environment } from '@web/environments/environment';

import { IndexPageCoreComponent } from '@web/app/core/containers/index-page-core/index-page-core.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GraphqlModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Web Store DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot(effects),
    CoreModule.forRoot()
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true }
  ],
  bootstrap: [IndexPageCoreComponent]
})
export class AppModule { }
