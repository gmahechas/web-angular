import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects, metaReducers } from '@app/app/core/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from '@app/app/shared/router-utils';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { GraphqlModule } from '@app/app/graphql/graphql.module';
import { SharedModule } from '@app/app/shared/shared.module';
import { AuthModule } from '@app/app/auth/auth.module';
import { AppRoutingModule } from '@app/app/app-routing.module';
import { CoreModule } from '@app/app/core/core.module';

import { environment } from '@app/environments/environment';

import { IndexPageCoreComponent } from '@app/app/core/containers/index-page-core/index-page-core.component';

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
  providers: [{ provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }],
  bootstrap: [IndexPageCoreComponent]
})
export class AppModule { }
