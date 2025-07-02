import AddVenue from "views/examples/AddVenue";
import Logs from "views/examples/Logs";
import Profile from "views/examples/Profile";
import Settings from "views/examples/Settings";

const hiddenRoutes = [
 /*  {
    path: "/logs",
    component: <Logs />,
    layout: "/admin",
  }, */
  {
    path:"/settings",
    component: <Settings/>,
    layout: "/admin",
  },
  {
    path: "/profile",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/experience/edit/:id",
    name: "Edit Experience",
    layout: "/admin",
    component: <AddVenue />
  }
];

export default hiddenRoutes;