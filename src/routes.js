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
import AddUnit from "views/examples/AddUnit.js";
import AddFee from "views/examples/AddFee.js";
import AddUser from "views/examples/AddUser.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/MemberList.js";
import Icons from "views/examples/Icons.js";
import EditMember from "views/examples/EditMember";
import MemberPasses from "views/examples/MemberPasses";
import AddActivity from "views/examples/AddActivity";
import Tennis from "views/examples/Tennis";
import Spa from "views/examples/Spa";
import Fitness from "views/examples/Fitness";
import Eventlist from "views/examples/EventList";
import AddEvent from "views/examples/AddEvent";
import Report from "views/examples/Report";
import Food from "views/examples/Food";
import EmployeeList from "views/examples/EmployeeList";
import AddEmployee from "views/examples/AddEmployee";
import EditEmployee from "views/examples/EditEmployee";
import AddVenue from "views/examples/AddVenue";
import EmployeeAcess from "views/examples/EmployeeAcess";
import Ads from "./components/Ads/Ads";
import VenueList from "views/examples/VenueList";
import Booking from "views/examples/Booking";
import SetupMember from "views/examples/SetupMember";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2",
    component: <Index />,
    layout: "/admin",
    active: true
  },
  {
    name: "Membership",
    icon: "ni ni-paper-diploma",
    collapse: true,
    state: "membershipCollapse",
    active: true,
    views: [
      {
        path: "/membership/list",
        name: "Members List",
        layout: "/admin",
        component: <Tables />,
        active: true,
      },
      {
        path: "/membership/add",
        name: "Setup members",
        layout: "/admin",
        component: <SetupMember />,
        active: true,
      },
    ],
  },
  {
    name: "Communications",
    icon: "ni ni-notification-70",
    collapse: true,
    state: "communitcationCollapse",
    active: true,
    views: [
      {
        path: "/communication/event/management",
        name: "Ads",
        layout: "/admin",
        component: <Ads />,
        hideFooter: true,
        active: true,
      },
      {
        path: "/communication/builder",
        name: "Form Builder",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
      {
        path: "/communication/Emails",
        name: "Emails",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
      {
        path: "/communication/group",
        name: "Group Messaging",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
      {
        path: "/communication/geomarketing",
        name: "Geo-marketing",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
      {
        path: "/communication/demographic/reports",
        name: "Demographic Reports",
        layout: "/admin",
        component: <Report />,
        active: false,
      },
    ],
  },
  {
    name: "Administration",
    icon: "ni ni-money-coins",
    collapse: true,
    state: "adminCollapse",
    active: true,
    views: [
      {
        path: "/users/list",
        name: "Add user",
        layout: "/admin",
        component: <AddUser />,
        active: true,
      },
      {
        path: "/accounting/fees/add",
        name: "Add fees",
        layout: "/admin",
        component: <AddFee />,
        active: true,
      },
      {
        path: "/administrations/units/add",
        name: "Add units",
        layout: "/admin",
        component: <AddUnit />,
        active: true,
      },
      {
        path: "/administrations/demographic/add",
        name: "Add Demographic",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
      {
        path: "/administrations/delivery",
        name: "Delivery",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
    ],
  },
  {
    name: "Accounting",
    icon: "ni ni-collection",
    collapse: true,
    state: "accountingCollapse",
    active: false,
    views: [
      {
        path: "/accounting/fees",
        name: "Membership Fees",
        layout: "/admin",
        component: <Tables />,
        active: false,
      },
      {
        path: "/accounting/poa",
        name: "POA Fees",
        layout: "/admin",
        component: <Tables />,
        active: false,
      },
      {
        path: "/accounting/spending",
        name: "Spending Minimus",
        layout: "/admin",
        component: <Tables />,
        active: false,
      },
      {
        path: "/accounting/estoppel",
        name: "Estoppel",
        layout: "/admin",
        component: <Tables />,
        active: false,
      },
    ],
  },
  {
    name: "Inventory",
    icon: "ni ni-building",
    collapse: true,
    state: "invetoryCollapse",
    active: false,
    views: [
      {
        path: "/inventory/list",
        name: "Items List",
        layout: "/admin",
        component: <Tables />,
        active: false,
      },
      {
        path: "/inventory/add",
        name: "Add Items",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
      {
        path: "/inventory/count",
        name: "Inventory Count",
        layout: "/admin",
        component: <Tables />,
        active: false,
      },
      {
        path: "/inventory/departments",
        name: "By Departments",
        layout: "/admin",
        component: <Tables />,
        active: false,
      },
      {
        path: "/inventory/report",
        name: "Report",
        layout: "/admin",
        component: <Report />,
        active: false,
      },
    ],
  },
  {
    name: "Activities",
    icon: "ni ni-calendar-grid-58",
    collapse: true,
    state: "activitiesCollapse",
    active: false,
    views: [
      {
        path: "/booking",
        name: "Bookings",
        layout: "/admin",
        component: <Booking />,
      },
      {
        path: "/experience/list",
        name: "Experience List",
        layout: "/admin",
        component: <VenueList />,
      },
      {
        path: "/experience/add",
        name: "Add Experience",
        layout: "/admin",
        component: <AddVenue />,
      },
    ],
  },
  {
    name: "Events",
    icon: "ni ni-book-bookmark",
    collapse: true,
    state: "eventCollapse",
    active: false,
    views: [
      {
        path: "/events/list",
        name: "Events List",
        layout: "/admin",
        component: <Eventlist />,
        active: false,
      },
      {
        path: "/events/add",
        name: "Add Event",
        layout: "/admin",
        component: <AddEvent />,
      },
      {
        path: "/events/builder",
        name: "Builder Forms",
        layout: "/admin",
        component: <AddEvent />,
        active: false,
      },
      {
        path: "/events/opration",
        name: "Hours of Operation",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
      {
        path: "/events/calendar",
        name: "Online Calendar",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
      {
        path: "/events/department",
        name: "Color by Department",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
      {
        path: "/events/report",
        name: "Report",
        layout: "/admin",
        component: <Report />,
        active: false,
      },
    ],
  },
  {
    name: "HR",
    icon: "ni ni-books",
    collapse: true,
    state: "hrCollapse",
    active: false,
    views: [
      {
        path: "/administration/employees/list",
        name: "Employees List",
        layout: "/admin",
        component: <EmployeeList />,
        active: false,
      },
      {
        path: "/administration/employees/add",
        name: "Add Employee",
        layout: "/admin",
        component: <AddEmployee />,
        active: false,
      },
      {
        path: "/administration/employees/edit",
        name: "Edit Employee",
        layout: "/admin",
        component: <EditEmployee />,
        active: false,
      },
      {
        path: "/administration/employees/access",
        name: "Employee Access",
        layout: "/admin",
        component: <EmployeeAcess />,
        active: false,
      },
      {
        path: "/administration/employees/rules",
        name: "Rules & Regs",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
      {
        path: "/administration/employees/handbook",
        name: "Employee Handbook",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
      {
        path: "/administration/hr/info",
        name: "HR Info",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
      {
        path: "/administration/jobs/applications",
        name: "Job Applications",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
      {
        path: "/administration/policies",
        name: "Policies",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
    ],
  },
  {
    name: "Security",
    icon: "ni ni-lock-circle-open",
    collapse: true,
    state: "securityCollapse",
    active: false,
    views: [
      {
        path: "/security/parking/passes",
        name: "Parking Passes",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
      {
        path: "/security/guest/access",
        name: "Guest Access",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
      {
        path: "/security/incidents",
        name: "Incident Reporting",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
      {
        path: "/security/emergency",
        name: "Emergency Numbers",
        layout: "/admin",
        component: <Profile />,
        active: false,
      },
    ],
  },
];
export default routes;
