import { Context } from '@web/app/features/e/context/models/context.model';

export interface SelectedContext {
  selectedEntity?: Context | null;
}

export const initialStateSelectedContext: SelectedContext = {
  selectedEntity: null
};
