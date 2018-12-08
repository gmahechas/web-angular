import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/c/type-person/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { TypePersonRoutingModule } from '@web/app/features/c/type-person/type-person-routing.module';

import * as fromContainers from '@web/app/features/c/type-person/containers';
import * as fromComponents from '@web/app/features/c/type-person/components';
import * as fromShared from '@web/app/features/c/type-person/shared';

@NgModule({
  imports: [
    SharedModule,
    TypePersonRoutingModule,
    StoreModule.forFeature('type_person', reducers),
    EffectsModule.forFeature(effects),
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
export class TypePersonModule { }
