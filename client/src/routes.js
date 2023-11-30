import App from "./App";
import HomePage from "./pages/homePage";
import Authentication from "./pages/authentication";
import Error404 from "./pages/error404";
import Login from "./pages/login";
import Register from "./pages/register";
import Communities from "./pages/communities";
import Journals from "./pages/journals";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: "/users/:id/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/communities",
        element: <Communities />,
      },
      {
        path: "/users/:id/profile",
        element: <Profile />,
      },
      {
        path: "/users/:id/journals",
        element: <Journals />,
      },
    ],
  },
];

export default routes;
