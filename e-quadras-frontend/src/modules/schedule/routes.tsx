import { RouteObject } from 'react-router-dom';

import ScheduleScreen from './screens/ScheduleScreen';

export enum ScheduleRoutesEnum {
  SCHEDULE = '/schedule',
}

export const scheduleRoutes: RouteObject[] = [
  {
    path: ScheduleRoutesEnum.SCHEDULE,
    element: <ScheduleScreen />,
  },
];
