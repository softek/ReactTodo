import React from 'react';
import { RouteObject } from 'react-router-dom';
import { List } from './List';

export * from './List';
export const routes: RouteObject[] = [
  {
    path: '/list/:listId',
    element: <List />,
  },
];
