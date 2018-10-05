import { AuthEffects } from '@app/app/auth/store/effects/auth.effects';
import { LayoutAuthEffects } from '@app/app/auth/store/effects/layout-auth.effects';

export const effects: any[] = [
  AuthEffects,
  LayoutAuthEffects
];

export * from '@app/app/auth/store/effects/auth.effects';
export * from '@app/app/auth/store/effects/layout-auth.effects';
