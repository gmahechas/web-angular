import { RouterCoreEffects } from '@app/app/core/store/effects/router-core.effects';
import { LayoutCoreEffects } from '@app/app/core/store/effects/layout-core.effects';

export const effects: any[] = [RouterCoreEffects, LayoutCoreEffects];

export * from '@app/app/core/store/effects/router-core.effects';
export * from '@app/app/core/store/effects/layout-core.effects';
