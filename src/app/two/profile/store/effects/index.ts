import { EntityProfileEffects } from '@web/app/two/profile/store/effects/entity-profile.effects';
import { LayoutProfileEffects } from '@web/app/two/profile/store/effects/layout-profile.effects';

export const effects: any[] = [
    EntityProfileEffects,
    LayoutProfileEffects
];

export * from '@web/app/two/profile/store/effects/entity-profile.effects';
export * from '@web/app/two/profile/store/effects/layout-profile.effects';
