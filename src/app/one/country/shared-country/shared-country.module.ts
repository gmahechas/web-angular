import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './../store';
import { EffectsModule } from '@ngrx/effects';


import * as fromComponents from './components';

@NgModule({
  imports: [
    StoreModule.forFeature('country', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    ...fromComponents.components
  ],
  exports: [
    ...fromComponents.components
  ]
})
export class SharedCountryModule { }
