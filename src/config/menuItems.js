import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineMoneyCollect,
  AiOutlineBank,
} from "react-icons/ai";

export const menuItems = [
  {
    title: "Dashboard",
    icon: AiOutlineHome,
    path: "/dashboard",
  },
  {
    title: "User Management",
    icon: AiOutlineUser,
    submenu: [
      {
        title: "All Users",
        path: "/users",
      },

      {
        title: "Active Users",
        path: "/users/active",
      },
      {
        title: "Pending Users",
        path: "/users/pending",
      },
      {
        title: "Inactive Users",
        path: "/users/inactive",
      },

      {
        title: "Suspended Users",
        path: "/users/suspended",
      },
    ],
  },
  {
    title: "Banking",
    icon: AiOutlineBank,
    submenu: [
      {
        title: "Banks",
        path: "/banks",
      },

      {
        title: "Bank Accounts",
        path: "/bank-accounts",
      },
    ],
  },
  {
    title: "Withdraws",
    icon: AiOutlineMoneyCollect,
    path: "/withdraw",
  },
  {
    title: "Settings",
    icon: AiOutlineSetting,
    path: "/settings",
  },
];
