import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserType } from '../../modules/login/types/UserType';

interface UserState {
  user?: UserType;
}

const initialState: UserState = {
  user: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAction: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserAction } = userSlice.actions;

export default userSlice.reducer;
