import { EntityPersonEffects } from '@web/app/two/person/store/effects/entity-person.effects';
import { LayoutPersonEffects } from '@web/app/two/person/store/effects/layout-person.effects';

export const effects: any[] = [
    EntityPersonEffects,
    LayoutPersonEffects
];

export * from '@web/app/two/person/store/effects/entity-person.effects';
export * from '@web/app/two/person/store/effects/layout-person.effects';
