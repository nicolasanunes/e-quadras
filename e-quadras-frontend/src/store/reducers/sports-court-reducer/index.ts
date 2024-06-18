import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SportsCourtType } from '../../../shared/types/SportsCourtType';

interface SportsCourtState {
  sportsCourts: SportsCourtType[];
  sportsCourt?: SportsCourtType;
}

const initialState: SportsCourtState = {
  sportsCourts: [],
  sportsCourt: undefined,
};

export const counterSlice = createSlice({
  name: 'sportsCourtReducer',
  initialState,
  reducers: {
    setSportsCourtsAction: (state, action: PayloadAction<SportsCourtType[]>) => {
      state.sportsCourts = action.payload;
    },
    setSportsCourtAction: (state, action: PayloadAction<SportsCourtType | undefined>) => {
      state.sportsCourt = action.payload;
    },
  },
});

export const { setSportsCourtsAction, setSportsCourtAction } = counterSlice.actions;

export default counterSlice.reducer;
