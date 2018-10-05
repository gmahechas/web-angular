import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Profile } from '@web/app/two/profile/models/profile.model';
import { EntityActionTypes, EntityActions } from '@web/app/two/profile/store/actions/entity-profile.actions';

export interface State extends EntityState<Profile> {

}

export const adapter: EntityAdapter<Profile> = createEntityAdapter<Profile>({
  selectId: (entity: Profile) => entity.profile_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationProfile.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeProfile, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateProfile.profile_id,
        changes: action.payload.entity.updateProfile
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyProfile.profile_id, state);
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
