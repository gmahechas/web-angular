import { RouterCoreEffects } from '@web/app/core/store/effects/router-core.effects';
import { LayoutCoreEffects } from '@web/app/core/store/effects/layout-core.effects';

export const effects: any[] = [RouterCoreEffects, LayoutCoreEffects];

export * from '@web/app/core/store/effects/router-core.effects';
export * from '@web/app/core/store/effects/layout-core.effects';
