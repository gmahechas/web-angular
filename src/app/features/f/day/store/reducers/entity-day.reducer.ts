import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromDayActions from '@web/app/features/f/day/store/actions';
import { Day } from '@web/app/features/f/day/models/day.model';

export interface State extends EntityState<Day> { }

export const adapter: EntityAdapter<Day> = createEntityAdapter<Day>({
  selectId: (entity: Day) => entity.day_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromDayActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationDay.data, state)
  ),
  on(
    fromDayActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromDayActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeDay, newState);
    }
  ),
  on(
    fromDayActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateDay.day_id, changes: entity.updateDay }, state)
  ),
  on(
    fromDayActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyDay.day_id, state)
  ),
  on(
    fromDayActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
