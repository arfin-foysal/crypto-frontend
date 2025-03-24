import { 
  AiOutlineHome, 
  AiOutlineUser, 
  AiOutlineShoppingCart, 
  AiOutlineBarChart, 
  AiOutlineSetting 
} from 'react-icons/ai';
import Dashboard from '../pages/dashboard/Dashboard';

export const menuItems = [
  {
    title: 'Dashboard',
    icon: AiOutlineHome,
    path: '/dashboard',
    element: () =><Dashboard/>
  },
  {
    title: 'User Management',
    icon: AiOutlineUser,
    submenu: [
      { 
        title: 'All Users', 
        path: '/users',
        element: 'Users'  // Component name as string, will be mapped to actual component
      },
      { 
        title: 'Add User', 
        path: '/users/add',
        element: 'AddUser'
      },
      { 
        title: 'Roles', 
        path: '/users/roles',
        element: () => <h1 className="text-2xl font-bold">Roles</h1>
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
        element: () => <h1 className="text-2xl font-bold">Products</h1>
      },
      { 
        title: 'Add Product', 
        path: '/products/add',
        element: () => <h1 className="text-2xl font-bold">Add Product</h1>
      },
      { 
        title: 'Categories', 
        path: '/products/categories',
        element: () => <h1 className="text-2xl font-bold">Categories</h1>
      },
    ],
  },
  {
    title: 'Analytics',
    icon: AiOutlineBarChart,
    path: '/analytics',
    element: () => <h1 className="text-2xl font-bold">Analytics</h1>
  },
  {
    title: 'Settings',
    icon: AiOutlineSetting,
    path: '/settings',
    element: () => <h1 className="text-2xl font-bold">Settings</h1>
  },
];