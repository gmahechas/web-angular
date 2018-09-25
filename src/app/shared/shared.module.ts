import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import * as fromPrime from './prime';
import * as fromComponents from './components';
import * as fromPipes from './pipes';
import { FetchStringInArraySharedPipe } from './pipes/fetch-string-in-array-shared.pipe';
import { ParentChildArraySharedPipe } from './pipes/parent-child-array-shared.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...fromPrime.prime
  ],
  declarations: [
    ...fromComponents.components,
    ...fromPipes.pipes,
    FetchStringInArraySharedPipe,
    ParentChildArraySharedPipe
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ...fromPrime.prime,
    ...fromComponents.components,
    ...fromPipes.pipes
  ]
})
export class SharedModule { }
