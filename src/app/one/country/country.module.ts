import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './country.routes';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { CountryService } from './services/country.service';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('country', reducers),
    EffectsModule.forFeature(effects),
    SharedModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  providers: [
    ...fromServices.services,
    ...fromGuards.guards
  ]
})
export class CountryModule { }
