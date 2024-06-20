import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App.jsx";
import Tasks from "./pages/Tasks.jsx";
import "./styles/index.css";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { UserProvider } from "./context/UserContext.jsx";

axios.defaults.baseURL = "http://localhost:3000/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "board/:boardId",
    element: <Tasks />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
);
