import { EntityEstateEffects } from './entity-estate.effects';
import { LayoutEstateEffects } from './layout-estate.effects';

export const effects: any[] = [
    EntityEstateEffects,
    LayoutEstateEffects
];

export * from './entity-estate.effects';
export * from './layout-estate.effects';
