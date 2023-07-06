import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import UserContext from "./store/Context.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import SingleTweetPage from "./pages/SingleTweetPage.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import LayOut from "./components/LayOut.jsx";
import HomePage from "./pages/HomePage.jsx";
import PrivateRouter from "./components/PrivateRouter";
import ExplorePage from "./pages/ExplorePage";
const queryClient = new QueryClient();
const route = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        element:<PrivateRouter/>,
        children:[
          {
            path:':loginId',
            element:<ProfilePage/>
          }
        ]
      },
      {
        path: "tweet/:id",
        element: <SingleTweetPage />,
      },
      {
        path:'tag/:id',
        element:<ExplorePage/>
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <SignupPage />,
      },
      {
        path: "resetpassword",
        element: <ResetPassword />,
      },

    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserContext>
      <RouterProvider router={route} />
    </UserContext>
  </QueryClientProvider>
);
