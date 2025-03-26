import { 
  AiOutlineHome, 
  AiOutlineUser, 
  AiOutlineShoppingCart, 
  AiOutlineBarChart, 
  AiOutlineSetting, 
  AiOutlineMoneyCollect
} from 'react-icons/ai';

export const menuItems = [
  {
    title: 'Dashboard',
    icon: AiOutlineHome,
    path: '/dashboard',
  },
  {
    title: 'User Management',
    icon: AiOutlineUser,
    submenu: [
      { 
        title: 'All Users', 
        path: '/users',
      },
      { 
        title: 'Pending Users', 
        path: '/users/pending',
      },
      { 
        title: 'Inactive Users', 
        path: '/users/inactive',
      },

    ],
  },
  // {
  //   title: 'Products',
  //   icon: AiOutlineShoppingCart,
  //   submenu: [
  //     { 
  //       title: 'All Products', 
  //       path: '/products',
  //     },
  //     { 
  //       title: 'Add Product', 
  //       path: '/products/add',
  //     },
  //     { 
  //       title: 'Categories', 
  //       path: '/products/categories',
  //     },
  //   ],
  // },
  // {
  //   title: 'Analytics',
  //   icon: AiOutlineBarChart,
  //   path: '/analytics',
  // },
  {
    title: 'Withdraws',
    icon: AiOutlineMoneyCollect,
    path: '/withdraw',
  },
  {
    title: 'Settings',
    icon: AiOutlineSetting,
    path: '/settings',
  },
];
