import { EntityUserEffects } from '@web/app/two/user/store/effects/entity-user.effects';
import { LayoutUserEffects } from '@web/app/two/user/store/effects/layout-user.effects';

export const effects: any[] = [
    EntityUserEffects,
    LayoutUserEffects
];

export * from '@web/app/two/user/store/effects/entity-user.effects';
export * from '@web/app/two/user/store/effects/layout-user.effects';
