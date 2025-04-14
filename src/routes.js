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
import EditMember from "views/examples/EditMember";
import MemberPasses from "views/examples/MemberPasses";


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2",
    component: <Index />,
    layout: "/admin",
  },
  {
    name: "Membership",
    icon: "ni ni-paper-diploma",
    collapse: true,
    state: "membershipCollapse",
    views: [
      {
        path: "/membership/list",
        name: "Members List",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Tables />,
      },
      {
        path: "/membership/add",
        name: "Add Member",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/membership/edit",
        name: "Edit Member",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <EditMember />,
      },
      {
        path: "/membership/passes",
        name: "Members Passes",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <MemberPasses />,
      },
      {
        path: "/membership/report",
        name: "Report",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Tables />,
      }
    ],
  },
  {
    name: "Accounting",
    icon: "ni ni-collection",
    collapse: true,
    state: "accountingCollapse",
    views: [
      {
        path: "/accounting/fees",
        name: "Membership Fees",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Tables />,
      },
      {
        path: "/accounting/poa",
        name: "POA Fees",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Tables />,
      },
      {
        path: "/accounting/spending",
        name: "Spending Minimus",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Tables />,
      },
      {
        path: "/accounting/estoppel",
        name: "Estoppel",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Tables />,
      },
    ]
  },
  {
    name: "Inventory",
    icon: "ni ni-building",
    collapse: true,
    state: "invetoryCollapse",
    views: [
      {
        path: "/inventory/list",
        name: "Items List",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Tables />,
      },
      {
        path: "/inventory/add",
        name: "Add Items",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/inventory/count",
        name: "Inventory Count",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Tables />,
      },
      {
        path: "/inventory/departments",
        name: "By Departments",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Tables />,
      },
      {
        path: "/inventory/report",
        name: "Report",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Tables />,
      },
    ]
  },
  {
    name: "Activities",
    icon: "ni ni-calendar-grid-58",
    collapse: true,
    state: "activitiesCollapse",
    views: [
      {
        path: "/activity/add",
        name: "Add Activity",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/activity/tennis",
        name: "Tennis",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/activity/spa",
        name: "SPA",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/activity/fitness",
        name: "Fitness",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/activity/fb",
        name: "Food & Beverage",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/activity",
        name: "Report",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
    ]
  },
  {
    name: "Events",
    icon: "ni ni-book-bookmark",
    collapse: true,
    state: "eventCollapse",
    views: [
      {
        path: "/events/list",
        name: "Events List",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/events/add",
        name: "Add Event",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/events/builder",
        name: "Builder Forms",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/events/opration",
        name: "Hours of Operation",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/events/calendar",
        name: "Online Calendar",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/events/department",
        name: "Color by Department",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/events/report",
        name: "Report",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
    ]
  },
  {
    name: "HR",
    icon: "ni ni-books",
    collapse: true,
    state: "hrCollapse",
    views: [
      {
        path: "/administration/employees/list",
        name: "Employees List",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/administration/employees/add",
        name: "Add Employee",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/administration/employees/edit",
        name: "Edit Employee",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/administration/employees/access",
        name: "Employee Access",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/administration/employees/rules",
        name: "Rules & Regs",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/administration/employees/handbook",
        name: "Employee Handbook",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/administration/hr/info",
        name: "HR Info",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/administration/jobs/applications",
        name: "Job Applications",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/administration/policies",
        name: "Policies",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
    ]
  },
  {
    name: "Communications",
    icon: "ni ni-notification-70",
    collapse: true,
    state: "communitcationCollapse",
    views: [
      {
        path: "/communication/event/management",
        name: "Event management",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/communication/builder",
        name: "Form Builder",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/communication/Emails",
        name: "Emails",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/communication/group",
        name: "Group Messaging",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/communication/geomarketing",
        name: "Geo-marketing",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/communication/demographic/reports",
        name: "Demographic Reports",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      }
    ]
  },
  {
    name: "Administration",
    icon: "ni ni-money-coins",
    collapse: true,
    state: "adminCollapse",
    views: [
      {
        path: "/administrations/demographic/add",
        name: "Add Demographic",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/administrations/demographic/add",
        name: "Add Demographic",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/administrations/delivery",
        name: "Delivery",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
    ]
  },
  {
    name: "Security",
    icon: "ni ni-lock-circle-open",
    collapse: true,
    state: "securityCollapse",
    views: [
      {
        path: "/security/parking/passes",
        name: "Parking Passes",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/security/guest/access",
        name: "Guest Access",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/security/incidents",
        name: "Incident Reporting",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      },
      {
        path: "/security/emergency",
        name: "Emergency Numbers",
        icon: "ni ni-button-play",
        layout: "/admin",
        component: <Profile />,
      }
    ]
  }
];
export default routes;
