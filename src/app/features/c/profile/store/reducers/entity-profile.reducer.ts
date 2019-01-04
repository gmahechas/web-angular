import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Profile } from '@web/app/features/c/profile/models/profile.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/c/profile/store/actions/entity-profile.actions';

export interface State extends EntityState<Profile> {
  selected: {
    selectedEntity: Profile | null;
  };
}

export const adapter: EntityAdapter<Profile> = createEntityAdapter<Profile>({
  selectId: (entity: Profile) => entity.profile_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selected: {
    selectedEntity: null
  }
});

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(
        action.payload.entities.paginationProfile.data,
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll({ ...state, selected: { selectedEntity: null } });
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeProfile, newState);
    }

    case EntityActionTypes.SelectEntity: {
      return {
        ...state,
        selected: { selectedEntity: action.payload.entity }
      };
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateProfile.profile_id,
        changes: action.payload.entity.updateProfile
      },
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(
        action.payload.entity.destroyProfile.profile_id,
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll({ ...state, selected: { selectedEntity: null } });
    }

    default:
      return state;
  }

}

export const getSelected = (state: State) => state.selected;
