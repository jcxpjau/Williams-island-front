import Login from "views/examples/Login";
import Tables from "views/examples/Tables";

const hiddenRoutes = [
    {
      path: "/users/list",
      component: <Tables />,
      layout: "/admin",
    }
  ];

export default hiddenRoutes;