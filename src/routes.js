/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-yellow",
    component: <Index />,
    layout: "/admin",
  },
  {
    name: "Membership",
    icon: "ni ni-paper-diploma text-yellow",
    collapse: true,
    state: "adminCollapse",
    views: [
      {
        path: "/user-profile",
        name: "Set up Membership",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/tables",
        name: "Reports",
        icon: "ni ni-archive-2",
        layout: "/admin",
        component: <Tables />,
      },
    ],
  },
  {
    path: "/maps",
    name: "Members",
    icon: "ni ni-badge text-yellow",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Management",
    icon: "ni ni-building text-yellow",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Inventory",
    icon: "ni ni-collection text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Activities",
    icon: "ni ni-calendar-grid-58 text-yellow",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Events",
    icon: "ni ni-book-bookmark text-yellow",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Administration",
    icon: "ni ni-money-coins text-yellow",
    component: <Register />,
    layout: "/auth",
  },
];
export default routes;
