import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SportsCourtType } from '../../shared/types/SportsCourtType';

interface SportsCourtState {
  sportsCourt?: SportsCourtType;
}

const initialState: SportsCourtState = {
  sportsCourt: undefined,
};

const sportsCourtSlice = createSlice({
  name: 'sportsCourt',
  initialState,
  reducers: {
    setSportsCourtAction: (state, action: PayloadAction<SportsCourtType>) => {
      state.sportsCourt = action.payload;
    },
  },
});

export const { setSportsCourtAction } = sportsCourtSlice.actions;

export default sportsCourtSlice.reducer;
