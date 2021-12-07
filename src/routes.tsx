// import
import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Priority";
import Billing from "views/Dashboard/Billing.js";
import SignIn from "views/Pages/SignIn";

import {
  HomeIcon,
  CreditIcon,
  DocumentIcon,
} from "components/Icons/Icons";

import { HiTable, HiUserGroup } from 'react-icons/hi/index'
import Icon from "@chakra-ui/icon";
import { SettingsIcon } from "@chakra-ui/icons";
import Setting from "views/Dashboard/Setting";
import SystemFunctions from "views/Dashboard/SystemFunctions";
import UsersPage from "views/Dashboard/Users";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    rtlName: "users",
    icon: <Icon as={HiUserGroup} color="inherit" />,
    component: UsersPage,
    layout: "/admin",
  },
  {
    path: "/priority",
    name: "Priority",
    rtlName: "لوحة القيادة",
    icon: <Icon as={HiTable} color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
  // {
  //   path: "/billing",
  //   name: "Billing",
  //   rtlName: "لوحة القيادة",
  //   icon: <CreditIcon color="inherit" />,
  //   component: Billing,
  //   layout: "/admin",
  // },
  {
    path: "/system-functions",
    name: "System Functions",
    rtlName: "System Functions",
    icon: <SettingsIcon color="inherit" />,
    component: SystemFunctions,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Setting",
    rtlName: "Setting",
    icon: <SettingsIcon color="inherit" />,
    component: Setting,
    layout: "/admin",
  },
  // {
  //   path: "/rtl-support-page",
  //   name: "RTL",
  //   rtlName: "آرتيإل",
  //   icon: <SupportIcon color="inherit" />,
  //   component: RTLPage,
  //   layout: "/rtl",
  // },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      // {
      //   path: "/profile",
      //   name: "Profile",
      //   rtlName: "لوحة القيادة",
      //   icon: <PersonIcon color="inherit" />,
      //   secondaryNavbar: true,
      //   component: Profile,
      //   layout: "/admin",
      // },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      // {
      //   path: "/signup",
      //   name: "Sign Up",
      //   rtlName: "لوحة القيادة",
      //   icon: <RocketIcon color="inherit" />,
      //   secondaryNavbar: true,
      //   component: SignUp,
      //   layout: "/auth",
      // },
    ],
  },
];
export default dashRoutes;
