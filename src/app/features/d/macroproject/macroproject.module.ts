
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/d/macroproject/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { MacroprojectRoutingModule } from '@web/app/features/d/macroproject/macroproject-routing.module';
import { CityModule } from '@web/app/features/b/city/city.module';
import { OfficeModule } from '@web/app/features/b/office/office.module';

import * as fromContainers from '@web/app/features/d/macroproject/containers';
import * as fromComponents from '@web/app/features/d/macroproject/components';
import * as fromShared from '@web/app/features/d/macroproject/shared';

@NgModule({
  imports: [
    SharedModule,
    MacroprojectRoutingModule,
    StoreModule.forFeature('macroproject', reducers),
    EffectsModule.forFeature(effects),
    CityModule,
    OfficeModule
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
export class MacroprojectModule { }
