import { EntityProjectEffects } from '@app/app/three/project/store/effects/entity-project.effects';
import { LayoutProjectEffects } from '@app/app/three/project/store/effects/layout-project.effects';

export const effects: any[] = [
    EntityProjectEffects,
    LayoutProjectEffects
];

export * from '@app/app/three/project/store/effects/entity-project.effects';
export * from '@app/app/three/project/store/effects/layout-project.effects';
