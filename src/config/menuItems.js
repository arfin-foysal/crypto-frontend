import { 
  AiOutlineHome, 
  AiOutlineUser, 
  AiOutlineShoppingCart, 
  AiOutlineBarChart, 
  AiOutlineSetting 
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
        title: 'Add User', 
        path: '/users/add',
      },
      { 
        title: 'Roles', 
        path: '/users/roles',
      },
    ],
  },
  {
    title: 'Products',
    icon: AiOutlineShoppingCart,
    submenu: [
      { 
        title: 'All Products', 
        path: '/products',
      },
      { 
        title: 'Add Product', 
        path: '/products/add',
      },
      { 
        title: 'Categories', 
        path: '/products/categories',
      },
    ],
  },
  {
    title: 'Analytics',
    icon: AiOutlineBarChart,
    path: '/analytics',
  },
  {
    title: 'Settings',
    icon: AiOutlineSetting,
    path: '/settings',
  },
];
