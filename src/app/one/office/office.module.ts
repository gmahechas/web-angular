import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@app/app/one/office/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/app/shared/shared.module';
import { OfficeRoutingModule } from '@app/app/one/office/office-routing.module';
import { CityModule } from '@app/app/one/city/city.module';

import * as fromContainers from '@app/app/one/office/containers';
import * as fromComponents from '@app/app/one/office/components';
import * as fromShared from '@app/app/one/office/shared';

@NgModule({
  imports: [
    SharedModule,
    OfficeRoutingModule,
    StoreModule.forFeature('office', reducers),
    EffectsModule.forFeature(effects),
    CityModule
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
export class OfficeModule { }
