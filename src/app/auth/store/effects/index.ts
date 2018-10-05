import { AuthEffects } from '@web/app/auth/store/effects/auth.effects';
import { LayoutAuthEffects } from '@web/app/auth/store/effects/layout-auth.effects';

export const effects: any[] = [
  AuthEffects,
  LayoutAuthEffects
];
