import './index.css'
import React from 'react'
import App from './App.jsx'
import Home from './routes/Home.jsx'
import About from './routes/About.jsx'
import ReactDOM from 'react-dom/client'
import Contact from './routes/Contact.jsx'
import Plans from './routes/pages/Public/Plans.jsx'
import ErrorElement from './routes/ErrorElement.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Units from './routes/pages/Private/Units.jsx'

const router = createBrowserRouter([
  {
   path: "/",
   element: <App />,
   errorElement: <ErrorElement />,
   children: [
    {
      path: "/", 
      element: <Home />
    },
    {
      path: "/contact",
      element: <Contact />
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/plans",
      element: <Plans />
    },
   ]
  }, 
  {
    path: "/units",
    element: <Units />
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
