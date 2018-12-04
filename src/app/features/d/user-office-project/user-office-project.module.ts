import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/d/user-office-project/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { UserOfficeProjectRoutingModule } from '@web/app/features/d/user-office-project/user-office-project-routing.module';

import * as fromContainers from '@web/app/features/d/user-office-project/containers';

@NgModule({
  imports: [
    SharedModule,
    UserOfficeProjectRoutingModule,
    StoreModule.forFeature('user_office_project', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    ...fromContainers.containers
  ]
})
export class UserOfficeProjectModule { }
