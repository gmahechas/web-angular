import { EntityEstateEffects } from '@web/app/one/estate/store/effects/entity-estate.effects';
import { LayoutEstateEffects } from '@web/app/one/estate/store/effects/layout-estate.effects';

export const effects: any[] = [
    EntityEstateEffects,
    LayoutEstateEffects
];

export * from '@web/app/one/estate/store/effects/entity-estate.effects';
export * from '@web/app/one/estate/store/effects/layout-estate.effects';
