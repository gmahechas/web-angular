import { EntityMacroprojectEffects } from '@app/app/three/macroproject/store/effects/entity-macroproject.effects';
import { LayoutMacroprojectEffects } from '@app/app/three/macroproject/store/effects/layout-macroproject.effects';

export const effects: any[] = [
    EntityMacroprojectEffects,
    LayoutMacroprojectEffects
];

export * from '@app/app/three/macroproject/store/effects/entity-macroproject.effects';
export * from '@app/app/three/macroproject/store/effects/layout-macroproject.effects';
