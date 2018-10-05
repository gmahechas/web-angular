import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import * as fromPrime from '@app/app/shared/prime';
import * as fromComponents from '@app/app/shared/components';
import * as fromPipes from '@app/app/shared/pipes';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...fromPrime.prime
  ],
  declarations: [
    ...fromComponents.components,
    ...fromPipes.pipes
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
