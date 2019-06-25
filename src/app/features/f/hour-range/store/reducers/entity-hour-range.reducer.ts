import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromHourRangeActions from '@web/app/features/f/hour-range/store/actions';
import { HourRange } from '@web/app/features/f/hour-range/models/hour-range.model';

export interface State extends EntityState<HourRange> { }

export const adapter: EntityAdapter<HourRange> = createEntityAdapter<HourRange>({
  selectId: (entity: HourRange) => entity.hour_range_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromHourRangeActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationHourRange.data, state)
  ),
  on(
    fromHourRangeActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromHourRangeActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeHourRange, newState);
    }
  ),
  on(
    fromHourRangeActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateHourRange.hour_range_id, changes: entity.updateHourRange }, state)
  ),
  on(
    fromHourRangeActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyHourRange.hour_range_id, state)
  ),
  on(
    fromHourRangeActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
