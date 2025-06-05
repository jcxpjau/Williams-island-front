import AddVenue from "views/examples/AddVenue";
import Logs from "views/examples/Logs";
import Profile from "views/examples/Profile";
import UsersList from "views/examples/UsersList";
import AddUser from "views/examples/AddUser";

const hiddenRoutes = [
  {
    path: "/users/list",
    component: <AddUser />,
    layout: "/admin",
  },
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