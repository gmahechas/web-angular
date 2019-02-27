import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/c/user-office/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { UserOfficeRoutingModule } from '@web/app/features/c/user-office/user-office-routing.module';
import { UserModule } from '@web/app/features/c/user/user.module';
import { OfficeModule } from '@web/app/features/b/office/office.module';

import * as fromContainers from '@web/app/features/c/user-office/containers';
import * as fromComponents from '@web/app/features/c/user-office/components';
import * as fromShared from '@web/app/features/c/user-office/shared';

@NgModule({
  imports: [
    SharedModule,
    UserOfficeRoutingModule,
    StoreModule.forFeature('user_office', reducers),
    EffectsModule.forFeature(effects),
    UserModule,
    OfficeModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
    ...fromShared.shared
  ]
})
export class UserOfficeModule { }
