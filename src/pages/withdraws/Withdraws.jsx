import { useState } from 'react';
import { useGetApiQuery, useUpdateApiJsonMutation } from '../../store/api/commonSlice';
import { data, Link } from 'react-router-dom';
import { 
  HomeIcon, 
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import Pagination from '../../components/common/Pagination';
import TableSkeleton from '../../components/common/TableSkeleton';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

const WITHDRAWAL_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',    
  REJECTED: 'REJECTED',    
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

const statusMessages = {
  [WITHDRAWAL_STATUS.APPROVED]: 'approve',
  [WITHDRAWAL_STATUS.REJECTED]: 'reject',
  [WITHDRAWAL_STATUS.FAILED]: 'mark as failed',
  [WITHDRAWAL_STATUS.CANCELLED]: 'cancel'
};

export default function Withdraws() {

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [feeType, setFeeType] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [updateStatus] = useUpdateApiJsonMutation();

  const handleStatusUpdate = async (id, newStatus) => {
    confirmAlert({
      title: 'Confirm Status Change',
      message: `Are you sure you want to ${statusMessages[newStatus]} this withdrawal?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await updateStatus({
                end_point: `withdraws/status/${id}`,
                body: { status: newStatus }
              }).unwrap();
              toast.success(`Withdrawal successfully ${statusMessages[newStatus]}d`);
            } catch (error) {
              toast.error(`Failed to ${statusMessages[newStatus]} withdrawal`);
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  // Construct API URL with all filters
  const { data: withdrawsData, isLoading, isError } = useGetApiQuery({ 
    url: `withdraws?page=${page}&perPage=${perPage}${
      search ? `&search=${search}` : ''}${
      statusFilter ? `&status=${statusFilter}` : ''}${
      feeType ? `&fee_type=${feeType}` : ''}${
      minAmount ? `&minAmount=${minAmount}` : ''}${
      maxAmount ? `&maxAmount=${maxAmount}` : ''}${
      startDate ? `&startDate=${startDate}` : ''}${
      endDate ? `&endDate=${endDate}` : ''}`
  });



  const handleClearFilters = () => {
    setStatusFilter('');
    setFeeType('');
    setSearch('');
    setMinAmount('');
    setMaxAmount('');
    setStartDate('');
    setEndDate('');
    setPage(1);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case WITHDRAWAL_STATUS.APPROVED:
        return 'bg-green-100 text-green-800';
      case WITHDRAWAL_STATUS.REJECTED:
        return 'bg-red-100 text-red-800';
      case WITHDRAWAL_STATUS.FAILED:
        return 'bg-orange-100 text-orange-800';
      case WITHDRAWAL_STATUS.CANCELLED:
        return 'bg-gray-100 text-gray-800';
      case WITHDRAWAL_STATUS.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
          <span className="text-gray-700">Withdrawals</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Withdrawal Management</h1>
        <p className="text-gray-600 mt-1">Monitor and manage withdrawal requests</p>
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
                  placeholder="Search transaction ID..."
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
          </div>

          {/* Extended Filter Panel */}
          {filterOpen && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full rounded-md border-gray-300"
                  >
                    <option value="">All Status</option>
                    <option value={WITHDRAWAL_STATUS.PENDING}>Pending</option>
                    <option value={WITHDRAWAL_STATUS.APPROVED}>Approved</option>
                    <option value={WITHDRAWAL_STATUS.REJECTED}>Rejected</option>
                    <option value={WITHDRAWAL_STATUS.FAILED}>Failed</option>
                    <option value={WITHDRAWAL_STATUS.CANCELLED}>Cancelled</option>
                  </select>
                </div>

                {/* Fee Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fee Type</label>
                  <select
                    value={feeType}
                    onChange={(e) => setFeeType(e.target.value)}
                    className="block w-full rounded-md border-gray-300"
                  >
                    <option value="">All Types</option>
                    <option value="WIRE">Wire</option>
                    <option value="CRYPTO">Crypto</option>
                  </select>
                </div>

                {/* Amount Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      className="block w-full rounded-md border-gray-300"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      className="block w-full rounded-md border-gray-300"
                    />
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="block w-full rounded-md border-gray-300"
                    />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="block w-full rounded-md border-gray-300"
                    />
                  </div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">DateTime</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Full Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <TableSkeleton columns={8} rows={10} />
              ) : withdrawsData?.data?.data.map((withdraw, index) => (
                <tr key={withdraw.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(withdraw.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {withdraw.user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {withdraw.user.full_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span>{withdraw.user.bankAccounts.account_number}</span>
                      <span className="text-xs text-gray-400">{withdraw.user.bankAccounts.bank.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${withdraw.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(withdraw.status)}`}>
                      {withdraw.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Link 
                        to={`/withdraws/${withdraw.id}`}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </Link>
                      {withdraw.status === WITHDRAWAL_STATUS.PENDING && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(withdraw.id, WITHDRAWAL_STATUS.APPROVED)}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                            title="Approve Withdrawal"
                          >
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(withdraw.id, WITHDRAWAL_STATUS.REJECTED)}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                            title="Reject Withdrawal"
                          >
                            <XCircleIcon className="h-4 w-4 mr-1" />
                            Reject
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(withdraw.id, WITHDRAWAL_STATUS.CANCELLED)}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                            title="Cancel Withdrawal"
                          >
                            <XMarkIcon className="h-4 w-4 mr-1" />
                            Cancel
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(withdraw.id, WITHDRAWAL_STATUS.FAILED)}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                            title="Mark as Failed"
                          >
                            <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                            Failed
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {withdrawsData && (
          <Pagination
            currentPage={withdrawsData.currentPage}
            totalPages={withdrawsData.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
  
