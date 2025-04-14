import Login from "views/examples/Login";
import Tables from "views/examples/Tables";
import UsersList from "views/examples/UsersList";

const hiddenRoutes = [
    {
      path: "/users/list",
      component: <UsersList />,
      layout: "/admin",
    }
  ];

export default hiddenRoutes;