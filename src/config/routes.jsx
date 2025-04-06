import Dashboard from '../pages/dashboard/Dashboard';

import Users from '../pages/users/Users';
import DetailUser from '../pages/users/DetailUser';
import PendingUsers from '../pages/users/PendingUsers';
import InactiveUsers from '../pages/users/InactiveUser';
import Withdraws from '../pages/withdraws/Withdraws';
import SuspendedUsers from '../pages/users/SuspendedUsers';
import ActiveUsers from '../pages/users/ActiveUsers';
import AddUser from '../pages/users/AddUser';
import EditUser from '../pages/users/EditUser';

// Bank Management
import Banks from '../pages/banks/Banks';
import AddBank from '../pages/banks/AddBank';
import EditBank from '../pages/banks/EditBank';
import ViewBank from '../pages/banks/ViewBank';

// Bank Account Management
import BankAccounts from '../pages/bank-accounts/BankAccounts';
import AddBankAccount from '../pages/bank-accounts/AddBankAccount';
import EditBankAccount from '../pages/bank-accounts/EditBankAccount';
import ViewBankAccount from '../pages/bank-accounts/ViewBankAccount';

// Component mapping for string-based references
const componentMap = {
  Users,
  AddUser,
  Banks,
  AddBank,
  BankAccounts,
  AddBankAccount,
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
    path: '/users/edit/:id',
    element: () => <EditUser />,
    hideInMenu: true
  },
  {
    path: '/users/:id',
    element: () => <DetailUser />,
    hideInMenu: true
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
    path: '/users/suspended',
    element: () => <SuspendedUsers />
  },
  {
    path: '/withdraw',
    element: () => <Withdraws />
  },

  // Bank Management Routes
  {
    path: '/banks',
    element: () => <Banks />
  },
  {
    path: '/banks/add',
    element: () => <AddBank />
  },
  {
    path: '/banks/:id',
    element: () => <ViewBank />,
    hideInMenu: true
  },
  {
    path: '/banks/edit/:id',
    element: () => <EditBank />,
    hideInMenu: true
  },

  // Bank Account Management Routes
  {
    path: '/bank-accounts',
    element: () => <BankAccounts />
  },
  {
    path: '/bank-accounts/add',
    element: () => <AddBankAccount />
  },
  {
    path: '/bank-accounts/:id',
    element: () => <ViewBankAccount />,
    hideInMenu: true
  },
  {
    path: '/bank-accounts/edit/:id',
    element: () => <EditBankAccount />,
    hideInMenu: true
  },

  {
    path: '/settings',
    element: () => <h1 className="text-2xl font-bold">Settings</h1>
  },
  // Dynamic routes

];

// Helper function to get all routes
export const getAllRoutes = () => routes;
