import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { lazy } from 'react'
import { Suspense } from 'react'

import NavigationBar from './components/Navigation/Navigation.jsx'
const ProfilePage = lazy(()=>import('./pages/Profile/Profile.jsx'))
const SignInPage = lazy(()=>import('./pages/SignIn/SignIn.jsx'))
const SignUpPage = lazy(()=>import('./pages/SignUp/SignUp.jsx'))
const HomePage = lazy(()=>import('./pages/Home/HomePage'))

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Suspense fallback={'DAMNNNNNN'}><HomePage /></Suspense>} />
    <Route path="/home" element={<Suspense fallback={'DAMNNNNNN'}><HomePage /></Suspense>}/>
    <Route path="/signin" element={<Suspense fallback={'DAMNNNNNN'}><SignInPage /></Suspense>} />
    <Route path="/signup" element={<Suspense fallback={'DAMNNNNNN'}><SignUpPage /></Suspense>} />
    <Route path="/profile" element={<Suspense fallback={'DAMNNNNNN'}><ProfilePage /></Suspense>} />
    </>
  )
);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
    <NavigationBar/>
    </React.StrictMode>
)
