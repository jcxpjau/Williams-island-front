import AddVenue from "views/examples/AddVenue";
import Logs from "views/examples/Logs";
import Profile from "views/examples/Profile";

const hiddenRoutes = [
  {
    path: "/logs",
    component: <Logs />,
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