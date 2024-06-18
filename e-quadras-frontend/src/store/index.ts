import { configureStore } from '@reduxjs/toolkit';

import globalReducer from './reducers/globalReducer';
import sportsCourtReducer from './reducers/sports-court-reducer';

export const store = configureStore({
  reducer: {
    sportsCourtReducer,
    globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
