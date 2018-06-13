import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import * as fromPrime from './prime';
import * as fromComponents from './components';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...fromPrime.prime
  ],
  declarations: [
    ...fromComponents.components
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ...fromPrime.prime,
    ...fromComponents.components
  ]
})
export class SharedModule { }
