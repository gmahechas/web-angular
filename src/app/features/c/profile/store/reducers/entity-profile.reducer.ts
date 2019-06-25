import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromProfileActions from '@web/app/features/c/profile/store/actions';
import { Profile } from '@web/app/features/c/profile/models/profile.model';

export interface State extends EntityState<Profile> { }

export const adapter: EntityAdapter<Profile> = createEntityAdapter<Profile>({
  selectId: (entity: Profile) => entity.profile_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromProfileActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationProfile.data, state)
  ),
  on(
    fromProfileActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromProfileActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeProfile, newState);
    }
  ),
  on(
    fromProfileActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateProfile.profile_id, changes: entity.updateProfile }, state)
  ),
  on(
    fromProfileActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyProfile.profile_id, state)
  ),
  on(
    fromProfileActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
