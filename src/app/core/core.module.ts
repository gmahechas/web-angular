import { NgModule, ModuleWithProviders } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ROOT_REDUCERS, metaReducers, effects } from '@web/app/core/store';
import { StoreRouterConnectingModule, RouterState, NavigationActionTiming } from '@ngrx/router-store';
import { CustomPreload, CustomRouterStateSerializer } from '@web/app/shared/router-utils';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SharedModule } from '@web/app/shared/shared.module';

import * as fromContainers from '@web/app/core/containers';
import * as fromComponents from '@web/app/core/components';
import * as fromServices from '@web/app/core/services';

import { httpInterceptorProviders } from '@web/app/core/interceptors/index';

import { environment } from '@web/environments/environment';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: false,
      },
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
      serializer: CustomRouterStateSerializer,
      navigationActionTiming: NavigationActionTiming.PostActivation
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Web Store DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot(effects),
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  exports: [
    ...fromContainers.containers
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        CustomPreload,
        httpInterceptorProviders,
        ...fromServices.services,
      ],
    };
  }
}
