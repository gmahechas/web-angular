import { EntityUserEffects } from '@web/app/features/c/user/store/effects/entity-user.effects';
import { LayoutUserEffects } from '@web/app/features/c/user/store/effects/layout-user.effects';

export const effects: any[] = [
    EntityUserEffects,
    LayoutUserEffects
];
