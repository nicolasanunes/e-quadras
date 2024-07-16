import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserType } from '../../../../modules/login/types/UserType';

interface GlobalState {
  user?: UserType;
}

const initialState: GlobalState = {
  user: undefined,
};

export const counterSlice = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setUserAction: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserAction } = counterSlice.actions;

export default counterSlice.reducer;
