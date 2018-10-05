import { EntityCityEffects } from '@app/app/one/city/store/effects/entity-city.effects';
import { LayoutCityEffects } from '@app/app/one/city/store/effects/layout-city.effects';

export const effects: any[] = [
    EntityCityEffects,
    LayoutCityEffects
];

export * from '@app/app/one/city/store/effects/entity-city.effects';
export * from '@app/app/one/city/store/effects/layout-city.effects';
