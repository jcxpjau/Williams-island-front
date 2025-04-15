import Login from "views/examples/Login";
import Logs from "views/examples/Logs";
import Tables from "views/examples/Tables";
import UsersList from "views/examples/UsersList";

const hiddenRoutes = [
    {
      path: "/users/list",
      component: <UsersList />,
      layout: "/admin",
    },
    {
      path: "/logs",
      component: <Logs />,
      layout: "/admin",
    }
  ];

export default hiddenRoutes;