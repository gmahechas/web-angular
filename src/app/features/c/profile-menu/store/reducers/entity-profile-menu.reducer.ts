import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromProfileMenuActions from '@web/app/features/c/profile-menu/store/actions';
import { ProfileMenu } from '@web/app/features/c/profile-menu/models/profile-menu.model';

export interface State extends EntityState<ProfileMenu> { }

export const adapter: EntityAdapter<ProfileMenu> = createEntityAdapter<ProfileMenu>({
  selectId: (entity: ProfileMenu) => entity.profile_menu_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromProfileMenuActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationProfileMenu.data, state)
  ),
  on(
    fromProfileMenuActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromProfileMenuActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeProfileMenu, newState);
    }
  ),
  on(
    fromProfileMenuActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateProfileMenu.profile_menu_id, changes: entity.updateProfileMenu }, state)
  ),
  on(
    fromProfileMenuActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyProfileMenu.profile_menu_id, state)
  ),
  on(
    fromProfileMenuActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);

