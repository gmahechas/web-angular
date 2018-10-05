import { EntityProjectEffects } from '@web/app/three/project/store/effects/entity-project.effects';
import { LayoutProjectEffects } from '@web/app/three/project/store/effects/layout-project.effects';

export const effects: any[] = [
    EntityProjectEffects,
    LayoutProjectEffects
];

export * from '@web/app/three/project/store/effects/entity-project.effects';
export * from '@web/app/three/project/store/effects/layout-project.effects';
