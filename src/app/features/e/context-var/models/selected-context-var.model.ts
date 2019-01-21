import { ContextVar } from '@web/app/features/e/context-var/models/context-var.model';

export interface SelectedContextVar {
  selectedEntity: ContextVar | null;
}

export const initialStateSelectedContextVar: SelectedContextVar = {
  selectedEntity: null
};
