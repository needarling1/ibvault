import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {  createBrowserRouter, RouterProvider, } from 'react-router-dom';
import './index.css'

import Home from './features/Home/Home'
import Questions from './features/Questions/Questions'
import Question from './features/Questions/Question';

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Home />,
  },
  {
    path: "/questions",
    element: <Questions />
  },
  {
    path: "/questions/:id",
    element: <Question />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

