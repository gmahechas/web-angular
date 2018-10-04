import { RouterCoreEffects } from './router-core.effects';
import { LayoutCoreEffects } from './layout-core.effects';

export const effects: any[] = [RouterCoreEffects, LayoutCoreEffects];

export * from './router-core.effects';
export * from './layout-core.effects';
