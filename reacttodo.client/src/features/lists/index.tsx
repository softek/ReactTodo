import React from 'react';
import { RouteObject } from 'react-router-dom';
import { routes as ListRoutes } from './list';
import { Lists } from './Lists';

export { Lists } from './Lists';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Lists />,
  },
  ...ListRoutes,
];
