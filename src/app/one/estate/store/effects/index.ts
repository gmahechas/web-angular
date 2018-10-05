import { EntityEstateEffects } from '@app/app/one/estate/store/effects/entity-estate.effects';
import { LayoutEstateEffects } from '@app/app/one/estate/store/effects/layout-estate.effects';

export const effects: any[] = [
    EntityEstateEffects,
    LayoutEstateEffects
];

export * from '@app/app/one/estate/store/effects/entity-estate.effects';
export * from '@app/app/one/estate/store/effects/layout-estate.effects';
