import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {  createBrowserRouter, RouterProvider, } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'

import { AuthProvider } from "./hooks/AuthContext";

import Home from './features/Home/Home'
import Questions from './features/Questions/Questions'
import Question from './features/Questions/Question';
import LoginPage from "./features/Login/LoginPage";
import CreateAccountPage from "./features/Login/CreateAccountPage";
import Resources from "./features/Resources/Resources";
import Support from "./features/Support/Support";
import Screen404 from "./features/404/404";

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
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/create-account",
    element: <CreateAccountPage />
  },
  {
    path: "/questions/:id",
    element: <Question />
  },
  {
    path: "/resources",
    element: <Resources />
  },
  {
    path: "/support",
    element: <Support />
  },
  {
    path: "*",
    element: <Screen404/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </GoogleOAuthProvider>
);

