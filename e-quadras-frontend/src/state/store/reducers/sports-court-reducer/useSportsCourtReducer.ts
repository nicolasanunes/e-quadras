import { useDispatch } from 'react-redux';

import { SportsCourtType } from '../../../../shared/types/SportsCourtType';
import { useAppSelector } from '../../hooks';
import { setSportsCourtAction, setSportsCourtsAction } from '.';

export const useSportsCourtReducer = () => {
  const dispatch = useDispatch();
  const { sportsCourts, sportsCourt } = useAppSelector((state) => state.sportsCourtReducer);

  const setSportsCourts = (currentSportsCourts: SportsCourtType[]) => {
    dispatch(setSportsCourtsAction(currentSportsCourts));
  };

  const setSportsCourt = (currentSportsCourt?: SportsCourtType) => {
    dispatch(setSportsCourtAction(currentSportsCourt));
  };

  return {
    sportsCourts,
    sportsCourt,
    setSportsCourts,
    setSportsCourt,
  };
};
