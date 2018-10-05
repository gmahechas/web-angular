import { EntityProfileEffects } from '@app/app/two/profile/store/effects/entity-profile.effects';
import { LayoutProfileEffects } from '@app/app/two/profile/store/effects/layout-profile.effects';

export const effects: any[] = [
    EntityProfileEffects,
    LayoutProfileEffects
];

export * from '@app/app/two/profile/store/effects/entity-profile.effects';
export * from '@app/app/two/profile/store/effects/layout-profile.effects';
