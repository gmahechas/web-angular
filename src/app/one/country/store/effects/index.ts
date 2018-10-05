import { EntityCountryEffects } from '@app/app/one/country/store/effects/entity-country.effects';
import { LayoutCountryEffects } from '@app/app/one/country/store/effects/layout-country.effects';

export const effects: any[] = [
    EntityCountryEffects,
    LayoutCountryEffects
];

export * from '@app/app/one/country/store/effects/entity-country.effects';
export * from '@app/app/one/country/store/effects/layout-country.effects';
