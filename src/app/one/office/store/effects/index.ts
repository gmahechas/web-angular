import { EntityOfficeEffects } from '@app/app/one/office/store/effects/entity-office.effects';
import { LayoutOfficeEffects } from '@app/app/one/office/store/effects/layout-office.effects';

export const effects: any[] = [
    EntityOfficeEffects,
    LayoutOfficeEffects
];

export * from '@app/app/one/office/store/effects/entity-office.effects';
export * from '@app/app/one/office/store/effects/layout-office.effects';
