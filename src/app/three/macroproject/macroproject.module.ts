
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@app/app/three/macroproject/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/app/shared/shared.module';
import { MacroprojectRoutingModule } from '@app/app/three/macroproject/macroproject-routing.module';
import { CityModule } from '@app/app/one/city/city.module';
import { OfficeModule } from '@app/app/one/office/office.module';

import * as fromContainers from '@app/app/three/macroproject/containers';
import * as fromComponents from '@app/app/three/macroproject/components';
import * as fromShared from '@app/app/three/macroproject/shared';

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
