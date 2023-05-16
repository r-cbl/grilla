import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import { Base } from './components/Base'
import Grilla from './components/Grilla'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Grilla />
    },
    {
        path: '/home',
        element: <Grilla />
    },

])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <Base>
            <RouterProvider router={router} />
        </Base>
    </React.StrictMode>
)

/*
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();*/
