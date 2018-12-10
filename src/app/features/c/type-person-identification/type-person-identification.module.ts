import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/c/type-person-identification/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { TypePersonIdentificationRoutingModule } from '@web/app/features/c/type-person-identification/type-person-identification-routing.module';

import * as fromContainers from '@web/app/features/c/type-person-identification/containers';
import * as fromComponents from '@web/app/features/c/type-person-identification/components';
import * as fromShared from '@web/app/features/c/type-person-identification/shared';

@NgModule({
  imports: [
    SharedModule,
    TypePersonIdentificationRoutingModule,
    StoreModule.forFeature('type_person_identification', reducers),
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
export class TypePersonIdentificationModule { }
