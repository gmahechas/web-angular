import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './auth.routes';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from './../shared/shared.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [...fromServices.services, ...fromGuards.guards],
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature(effects)
  ],
})
export class RootAuthModule {}
