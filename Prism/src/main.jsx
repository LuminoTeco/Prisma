import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./routes/Home.jsx";
import About from "./routes/About.jsx";
import Contact from "./routes/Contact.jsx";
import Plans from "./routes/pages/Public/Plans.jsx";
import Units from "./routes/pages/Private/Units.jsx";
import ErrorElement from "./routes/ErrorElement.jsx";
import Login from "./routes/pages/Public/Login/Login.jsx";
import Dashboard from "./routes/pages/Authenticated/Escola/Dashboard.jsx";
import ClassDetails from "./components/DashComponents/ClassDetails.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Divisor from "./routes/Divisor.jsx";
import LoginEstudante from "./routes/pages/Public/Login/LoginEstudante.jsx";
import Initial from "./routes/pages/Authenticated/Aluno/Initial.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorElement />,
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },
      { path: "/plans/:plan", element: <Plans />}
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/units",
    element: <Units />,
  },
  {
    path: "/turma/:id",
    element: <ClassDetails />,
  },
  {
    path: "/choice", 
    element: <Divisor />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login_estudante", 
    element: <LoginEstudante />
  }, 
  {
    path: "/inicio",
    element: <Initial />
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
