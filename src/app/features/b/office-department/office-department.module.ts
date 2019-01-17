import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/b/office-department/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { OfficeDepartmentRoutingModule } from '@web/app/features/b/office-department/office-department-routing.module';

import * as fromContainers from '@web/app/features/b/office-department/containers';
import * as fromComponents from '@web/app/features/b/office-department/components';
import * as fromShared from '@web/app/features/b/office-department/shared';

@NgModule({
  imports: [
    SharedModule,
    OfficeDepartmentRoutingModule,
    StoreModule.forFeature('office_department', reducers),
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
export class OfficeDepartmentModule { }
