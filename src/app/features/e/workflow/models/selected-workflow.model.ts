import { Workflow } from '@web/app/features/e/workflow/models/workflow.model';

export interface SelectedWorkflow {
  selectedEntity: Workflow | null;
}

export const initialStateSelectedWorkflow: SelectedWorkflow = {
  selectedEntity: null
};
