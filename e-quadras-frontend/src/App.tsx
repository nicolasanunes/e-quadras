import type { Router as RemixRouter } from '@remix-run/router';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { adminRoutes } from './modules/admin/routes';
import { firstScreenRoutes } from './modules/firtScreen/routes';
import { loginRoutes } from './modules/login/routes';
import { scheduleRoutes } from './modules/schedule/routes';
import { sportCourtsRoutes } from './modules/sportsCourt/routes';
import { verifyLoggedIn } from './shared/functions/connection/auth';
import { useGlobalReducer } from './state/store/reducers/globalReducer/useGlobalReducer';

function App() {
  const { user, setUser } = useGlobalReducer();

  const routes: RouteObject[] = [...firstScreenRoutes, ...loginRoutes, ...scheduleRoutes];
  const loggedInRoutes: RouteObject[] = [...sportCourtsRoutes, ...adminRoutes].map((route) => ({
    ...route,
    loader: () => verifyLoggedIn(setUser, user),
  }));

  const router: RemixRouter = createBrowserRouter([...routes, ...loggedInRoutes]);

  return <RouterProvider router={router} />;
}

export default App;
