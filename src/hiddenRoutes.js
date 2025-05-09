import AddVenue from "views/examples/AddVenue";
import Login from "views/examples/Login";
import Logs from "views/examples/Logs";
import Profile from "views/examples/Profile";
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
  },
  {
    path: "/profile",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/venue/edit/:id",
    name: "Edit Venue",
    layout: "/admin",
    component: <AddVenue />
  }
];

export default hiddenRoutes;