import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/d/user-office-project/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { UserOfficeProjectRoutingModule } from '@web/app/features/d/user-office-project/user-office-project-routing.module';

import * as fromContainers from '@web/app/features/d/user-office-project/containers';
import * as fromComponents from '@web/app/features/d/user-office-project/components';
import * as fromShared from '@web/app/features/d/user-office-project/shared';

@NgModule({
  imports: [
    SharedModule,
    UserOfficeProjectRoutingModule,
    StoreModule.forFeature('user_office_project', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
    ...fromShared.shared
  ]
})
export class UserOfficeProjectModule { }
