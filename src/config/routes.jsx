import Dashboard from '../pages/dashboard/Dashboard';
import Users from '../pages/Users';
import AddUser from '../pages/AddUser';
import EditUser from '../pages/EditUser';

// Component mapping for string-based references
const componentMap = {
  Users,
  AddUser,
};

export const routes = [
  {
    path: '/dashboard',
    element: () => <Dashboard />
  },
  {
    path: '/users',
    element: () => <Users />
  },
  {
    path: '/users/add',
    element: () => <AddUser />
  },
  {
    path: '/users/roles',
    element: () => <h1 className="text-2xl font-bold">Roles</h1>
  },
  {
    path: '/products',
    element: () => <h1 className="text-2xl font-bold">Products</h1>
  },
  {
    path: '/products/add',
    element: () => <h1 className="text-2xl font-bold">Add Product</h1>
  },
  {
    path: '/products/categories',
    element: () => <h1 className="text-2xl font-bold">Categories</h1>
  },
  {
    path: '/analytics',
    element: () => <h1 className="text-2xl font-bold">Analytics</h1>
  },
  {
    path: '/settings',
    element: () => <h1 className="text-2xl font-bold">Settings</h1>
  },
  // Dynamic routes
  {
    path: '/users/edit/:id',
    element: () => <EditUser />,
    hideInMenu: true
  }
];

// Helper function to get all routes
export const getAllRoutes = () => routes;