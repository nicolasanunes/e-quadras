import { RouteObject } from 'react-router-dom';

import SportsCourtScreen from './screens/SportsCourt';

export enum SportCourtsRoutesEnum {
  SPORTS_COURT = '/sports-court',
}

export const sportCourtsRoutes: RouteObject[] = [
  {
    path: SportCourtsRoutesEnum.SPORTS_COURT,
    element: <SportsCourtScreen />,
  },
];
