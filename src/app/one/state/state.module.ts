import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './state.routes';

import { SharedModule } from './../../shared/shared.module';

import * as fromContainers from './containers';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    ...fromContainers.containers
  ]
})
export class StateModule { }
