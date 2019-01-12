import { EntityDepartmentEffects } from '@web/app/features/b/department/store/effects/entity-department.effects';
import { LayoutDepartmentEffects } from '@web/app/features/b/department/store/effects/layout-department.effects';

export const effects: any[] = [
    EntityDepartmentEffects,
    LayoutDepartmentEffects
];
