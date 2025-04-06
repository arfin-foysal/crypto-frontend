import { useState } from 'react';
import { useGetApiQuery, useUpdateApiJsonMutation, useDeleteApiMutation } from '../../store/api/commonSlice';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import Pagination from '../../components/common/Pagination';
import TableSkeleton from '../../components/common/TableSkeleton';
import toast from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function BankAccounts() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [bankFilter, setBankFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [updateStatus] = useUpdateApiJsonMutation();
  const [deleteAccount] = useDeleteApiMutation();

  // Handle account deletion
  const handleDelete = (id, accountNumber) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: `Are you sure you want to delete bank account "${accountNumber}"?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await deleteAccount({
                end_point: `bank-accounts/${id}`,
                body: {}
              }).unwrap();
              toast.success('Bank account deleted successfully');
            } catch (error) {
              toast.error(error?.data?.errors || 'Failed to delete bank account');
              console.error('Delete error:', error);
            }
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  };

  // Handle status update
  const handleStatusUpdate = async (id, isOpen) => {
    const newStatus = !isOpen;
    const statusText = newStatus ? true : false;

    confirmAlert({
      title: 'Confirm Status Change',
      message: `Are you sure you want to ${statusText} this bank account?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await updateStatus({
                end_point: `bank-accounts/status/${id}`,
                body: { is_open: newStatus }
              }).unwrap();
              toast.success(`Bank account successfully ${statusText}ed`);
            } catch (error) {
              toast.error(`Failed to ${statusText} bank account`);
            }
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  };

  // Fetch bank accounts data
  const { data: accountsData, isLoading, isError } = useGetApiQuery({
    url: `bank-accounts?page=${page}${search ? `&search=${search}` : ''}${bankFilter ? `&bank_id=${bankFilter}` : ''}${statusFilter !== '' ? `&isOpen=${statusFilter}` : ''}`
  });

  // Fetch banks for dropdown
  const { data: banksDropdown } = useGetApiQuery({
    url: 'banks/dropdown/active'
  });



  // Clear all filters
  const handleClearFilters = () => {
    setBankFilter('');
    setStatusFilter('');
    setSearch('');
    setPage(1);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Link to="/" className="flex items-center hover:text-gray-700 transition">
            <HomeIcon className="h-4 w-4 mr-1" />
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Bank Accounts</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Bank Account Management</h1>
        <p className="text-gray-600 mt-1">Manage and organize bank accounts in the system</p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search account number..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <FunnelIcon className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
            {/* Add Bank Account Button */}
            <div>
              <Link
                to="/bank-accounts/add"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Bank Account
              </Link>
            </div>
          </div>

          {/* Extended Filter Panel */}
          {filterOpen && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bank Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank</label>
                  <select
                    value={bankFilter}
                    onChange={(e) => setBankFilter(e.target.value)}
                    className="block w-full p-2 border rounded-lg"
                  >
                    <option value="">All Banks</option>
                    {banksDropdown?.data?.map(bank => (
                      <option key={bank.id} value={bank.id}>{bank.name}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full p-2 border rounded-lg"
                  >
                    <option value="">All Accounts</option>
                    <option value="true">Open Accounts</option>
                    <option value="false">Closed Accounts</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Routing No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <TableSkeleton columns={8} rows={5} />
              ) : isError ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-red-500">
                    Error loading bank accounts. Please try again later.
                  </td>
                </tr>
              ) : accountsData?.data?.data?.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No bank accounts found.
                  </td>
                </tr>
              ) : (
                accountsData?.data?.data?.map((account, index) => (
                  <tr key={account.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{account.account_number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {account.routing_no || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {account.bank?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {account.user ? (
                        <div>
                          <div>{account.user.full_name}</div>
                          <div className="text-xs text-gray-400">{account.user.email}</div>
                        </div>
                      ) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${account.is_open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {account.is_open ? 'Open' : 'Closed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(account.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <Link to={`/bank-accounts/${account.id}`} className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="h-5 w-5" />
                        </Link>
                        <Link to={`/bank-accounts/edit/${account.id}`} className="text-indigo-600 hover:text-indigo-900">
                          <PencilIcon className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(account.id, account.account_number)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                        {account.is_open ? (
                          <button
                            onClick={() => handleStatusUpdate(account.id, account.is_open)}
                            className="text-red-600 hover:text-red-900"
                            title="Close Account"
                          >
                            <XCircleIcon className="h-5 w-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusUpdate(account.id, account.is_open)}
                            className="text-green-600 hover:text-green-900"
                            title="Open Account"
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && !isError && accountsData?.data && (
          <div className="px-6 py-4 border-t border-gray-200">
            <Pagination
              page={page}
              lastPage={accountsData.data.last_page || 1}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
