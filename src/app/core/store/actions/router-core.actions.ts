import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const Go = createAction(
  '[Router Core] Go',
  props<{
    path: any[];
    query?: object;
    extras?: NavigationExtras;
  }>()
);

export const Back = createAction(
  '[Router Core] Back'
);

export const Forward = createAction(
  '[Router Core] Forward'
);
