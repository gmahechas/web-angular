import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/b/office/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { OfficeRoutingModule } from '@web/app/features/b/office/office-routing.module';
import { CityModule } from '@web/app/features/a/city/city.module';

import * as fromContainers from '@web/app/features/b/office/containers';
import * as fromComponents from '@web/app/features/b/office/components';
import * as fromShared from '@web/app/features/b/office/shared';

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
