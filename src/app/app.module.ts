import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects, metaReducers } from './core/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './shared/router-utils';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { GraphqlModule } from './graphql/graphql.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

import { environment } from '../environments/environment';

import { IndexPageCoreComponent } from './core/containers/index-page-core/index-page-core.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true/* , enableTracing: true */ }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Web Store DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    GraphqlModule,
    SharedModule,
    CoreModule.forRoot(),
    AuthModule.forRoot()
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }],
  bootstrap: [IndexPageCoreComponent]
})
export class AppModule { }
