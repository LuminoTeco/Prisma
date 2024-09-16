import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Home from './routes/Home.jsx';
import About from './routes/About.jsx';
import Contact from './routes/Contact.jsx';
import Plans from './routes/pages/Public/Plans.jsx';
import Units from './routes/pages/Private/Units.jsx';
import ErrorElement from './routes/ErrorElement.jsx';
import Login from './routes/pages/Public/Institute/Login.jsx'
import Initial from './routes/pages/Authenticated/Initial.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/contact', element: <Contact /> },
      { path: '/about', element: <About /> },
      { path: '/plans/:plan', element: <Plans /> },
    ],
  },
  {
    path: '/units',
    element: <Units />,
  },
  {
    path: '/login',
    element: <Login />
  }, 
  {
    path: '/initial', 
    element: <Initial />
  }
]);

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
