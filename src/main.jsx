import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"

import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { Header } from "./common/Header/Header.jsx"
import { Home } from "./pages/Home/Home.jsx"
import { Register } from "./pages/Register/Register.jsx"
import { Login } from "./pages/Login/Login.jsx"
import Profile from "./pages/Profile/Profile.jsx"
import Services from "./pages/Services/Services.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        index: true,
        element: <Home />,
        // loader: clientesLoader,
        // errorElement: <ErrorPage />,
      },
      {
        path: "*",
        element: <Navigate to={"/"} replace />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/services",
        element: <Services />,
      },
    ],
  }, // we can add the route that we need
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
  </React.StrictMode>
)
