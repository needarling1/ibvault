import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {  createBrowserRouter, RouterProvider, } from 'react-router-dom';
import './index.css'

import Home from './features/Home/Home'
import Questions from './features/Questions/Questions'

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Home />,
  },
  {
    path: "/questions",
    element: <Questions />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

