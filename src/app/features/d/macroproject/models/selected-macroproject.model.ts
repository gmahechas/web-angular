import { Macroproject } from '@web/app/features/d/macroproject/models/macroproject.model';

export interface SelectedMacroproject {
  selectedEntity?: Macroproject | null;
}

export const initialStateSelectedMacroproject: SelectedMacroproject = {
  selectedEntity: null
};
