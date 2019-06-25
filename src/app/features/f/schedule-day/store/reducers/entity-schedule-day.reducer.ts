import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromScheduleDayActions from '@web/app/features/f/schedule-day/store/actions';
import { ScheduleDay } from '@web/app/features/f/schedule-day/models/schedule-day.model';

export interface State extends EntityState<ScheduleDay> { }

export const adapter: EntityAdapter<ScheduleDay> = createEntityAdapter<ScheduleDay>({
  selectId: (entity: ScheduleDay) => entity.schedule_day_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromScheduleDayActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationScheduleDay.data, state)
  ),
  on(
    fromScheduleDayActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromScheduleDayActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeScheduleDay, newState);
    }
  ),
  on(
    fromScheduleDayActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateScheduleDay.schedule_day_id, changes: entity.updateScheduleDay }, state)
  ),
  on(
    fromScheduleDayActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyScheduleDay.schedule_day_id, state)
  ),
  on(
    fromScheduleDayActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
