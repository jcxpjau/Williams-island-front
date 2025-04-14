import Login from "views/examples/Login";
import Tables from "views/examples/Tables";

const hiddenRoutes = [
    {
      path: "/admin/users/list",
      component: <Tables />,
      layout: "/admin",
    }
  ];

export default hiddenRoutes;