import { EntityCityEffects } from '@web/app/one/city/store/effects/entity-city.effects';
import { LayoutCityEffects } from '@web/app/one/city/store/effects/layout-city.effects';

export const effects: any[] = [
    EntityCityEffects,
    LayoutCityEffects
];

export * from '@web/app/one/city/store/effects/entity-city.effects';
export * from '@web/app/one/city/store/effects/layout-city.effects';
