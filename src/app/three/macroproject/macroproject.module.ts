
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/three/macroproject/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { MacroprojectRoutingModule } from '@web/app/three/macroproject/macroproject-routing.module';
import { CityModule } from '@web/app/one/city/city.module';
import { OfficeModule } from '@web/app/one/office/office.module';

import * as fromContainers from '@web/app/three/macroproject/containers';
import * as fromComponents from '@web/app/three/macroproject/components';
import * as fromShared from '@web/app/three/macroproject/shared';

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
