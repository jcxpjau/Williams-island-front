import Login from "views/examples/Login";
import Register from "views/examples/Register";

const authRoutes = [
  {
    path: "/login",
    name: "Login",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    component: <Register />,
    layout: "/auth",
  }

];

export default authRoutes;