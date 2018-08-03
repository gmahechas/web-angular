import { AuthEffects } from './auth.effects';
import { LayoutAuthEffects } from './layout-auth.effects';

export const effects: any[] = [
  AuthEffects,
  LayoutAuthEffects
];

export * from './auth.effects';
export * from './layout-auth.effects';
