import { configureStore } from '@reduxjs/toolkit';

import sportsCourtReducer from './sportsCourt/sportsCourtSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    sportsCourt: sportsCourtReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
