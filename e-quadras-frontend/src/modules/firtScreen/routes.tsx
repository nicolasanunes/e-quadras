import { RouteObject } from 'react-router-dom';

import FirtScreen from './screens/FirtScreen';

export enum FirstScreenRoutesEnum {
  FIRST_SCREEN = '/',
}

export const firstScreenRoutes: RouteObject[] = [
  {
    path: FirstScreenRoutesEnum.FIRST_SCREEN,
    element: <FirtScreen />,
  },
];
