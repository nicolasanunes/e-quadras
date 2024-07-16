import { RouteObject } from 'react-router-dom';

import AdminScreen from './screens/AdminScreen';

export enum AdminRoutesEnum {
  ADMIN = '/admin',
}

export const adminRoutes: RouteObject[] = [
  {
    path: AdminRoutesEnum.ADMIN,
    element: <AdminScreen />,
  },
];
