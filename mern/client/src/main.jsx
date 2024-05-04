import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserHomePage from "./components/UserHomePage";
import Journal from "./components/Journal";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/:username",
    element: <UserHomePage />,  // This should be a component that displays user-specific content
  },
  {
    path: "/journal/:username",
    element: <Journal />,  // This should be a component that displays user-specific content
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
