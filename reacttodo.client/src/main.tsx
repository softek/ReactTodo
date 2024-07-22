import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Navbar, NavbarBrand } from 'reactstrap';
import { store } from './app/api/store';
import './index.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import { routes as ListRoutes } from './features/lists';

function Root() {
  return (
    <>
      {/* all the other elements */}
      <div id="detail">
        <header>
          <Navbar
            className="mb-2"
            color="secondary"
            dark
          >
            <NavbarBrand href="/">
              Todo List Demo
            </NavbarBrand>
          </Navbar>
        </header>
        <div className="p-5 d-flex justify-content-center">
          <Outlet />
        </div>
      </div>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: ListRoutes,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
