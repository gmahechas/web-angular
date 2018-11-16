import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/b/estate/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { EstateRoutingModule } from '@web/app/features/b/estate/estate-routing.module';
import { CountryModule } from '@web/app/features/b/country/country.module';

import * as fromContainers from '@web/app/features/b/estate/containers';
import * as fromComponents from '@web/app/features/b/estate/components';
import * as fromShared from '@web/app/features/b/estate/shared';

@NgModule({
  imports: [
    SharedModule,
    EstateRoutingModule,
    StoreModule.forFeature('estate', reducers),
    EffectsModule.forFeature(effects),
    CountryModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
    ...fromShared.shared
  ],
  exports: [
    ...fromShared.shared
  ]
})
export class EstateModule { }
