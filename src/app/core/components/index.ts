import { NavCoreComponent } from './nav-core/nav-core.component';
import { GrowlCoreComponent } from './growl-core/growl-core.component';
import { BlockCoreComponent } from './block-core/block-core.component';
import { NotFoundCoreComponent } from './not-found-core/not-found-core.component';

export const components: any[] = [
    NavCoreComponent,
    GrowlCoreComponent,
    BlockCoreComponent,
    NotFoundCoreComponent
];

export * from './nav-core/nav-core.component';
export * from './growl-core/growl-core.component';
export * from './block-core/block-core.component';
export * from './not-found-core/not-found-core.component';
