import { NgModule } from '@angular/core';
import { CommonModule, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ReactiveFormsModule } from '@angular/forms';

import * as fromPrime from '@web/app/shared/prime';
import * as fromComponents from '@web/app/shared/components';
import * as fromPipes from '@web/app/shared/pipes';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    ...fromPrime.prime
  ],
  declarations: [
    ...fromComponents.components,
    ...fromPipes.pipes
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    ...fromPrime.prime,
    ...fromComponents.components,
    ...fromPipes.pipes
  ],
  providers: [LowerCasePipe, TitleCasePipe, UpperCasePipe]
})
export class SharedModule { }
