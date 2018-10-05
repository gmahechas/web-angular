import { EntityUserEffects } from '@app/app/two/user/store/effects/entity-user.effects';
import { LayoutUserEffects } from '@app/app/two/user/store/effects/layout-user.effects';

export const effects: any[] = [
    EntityUserEffects,
    LayoutUserEffects
];

export * from '@app/app/two/user/store/effects/entity-user.effects';
export * from '@app/app/two/user/store/effects/layout-user.effects';
