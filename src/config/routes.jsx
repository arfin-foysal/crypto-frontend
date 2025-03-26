import Dashboard from '../pages/dashboard/Dashboard';

import AddUser from '../pages/AddUser';
import EditUser from '../pages/EditUser';
import Users from '../pages/users/Users';
import DetailUser from '../pages/users/DetailUser';
import PendingUsers from '../pages/users/PendingUsers';
import InactiveUsers from '../pages/users/InactiveUser';
import Withdraws from '../pages/withdraws/Withdraws';
import RejectedUsers from '../pages/users/RejectedUsers';
import SuspendedUsers from '../pages/users/SuspendedUsers';
import ActiveUsers from '../pages/users/ActiveUsers';

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
    path: '/users/active',
    element: () => <ActiveUsers />
  },
  {
    path: '/users/pending',
    element: () => <PendingUsers />
  },
  {
    path: '/users/inactive',
    element: () => <InactiveUsers />
  },
  {
    path: '/users/rejected',
    element: () => <RejectedUsers/>
  },
  {
    path: '/users/suspended',
    element: () => <SuspendedUsers />
  },
  {
    path: '/Withdraw',
    element: () => <Withdraws />
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
  },
  {
    path: '/users/:id',
    element: () => <DetailUser />,
    hideInMenu: true
  }
];

// Helper function to get all routes
export const getAllRoutes = () => routes;
