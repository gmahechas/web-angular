import { EntityWorkflowEffects } from '@web/app/features/e/workflow/store/effects/entity-workflow.effects';
import { LayoutWorkflowEffects } from '@web/app/features/e/workflow/store/effects/layout-workflow.effects';

export const effects: any[] = [
    EntityWorkflowEffects,
    LayoutWorkflowEffects
];
