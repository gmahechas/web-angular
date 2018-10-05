import { EntityPersonEffects } from '@app/app/two/person/store/effects/entity-person.effects';
import { LayoutPersonEffects } from '@app/app/two/person/store/effects/layout-person.effects';

export const effects: any[] = [
    EntityPersonEffects,
    LayoutPersonEffects
];

export * from '@app/app/two/person/store/effects/entity-person.effects';
export * from '@app/app/two/person/store/effects/layout-person.effects';
