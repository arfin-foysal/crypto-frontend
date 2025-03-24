import { useState } from 'react';
import { useGetApiQuery } from '../store/api/commonSlice';
import { Link } from 'react-router-dom';
import { HomeIcon, PencilIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import Pagination from '../components/Pagination';

export default function Users() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { data: users, isLoading, isError } = useGetApiQuery({ url: `api/users?page=${page}&search=${search}` });

  if (isLoading) {
    return <div className="flex justify-center items-center h-64 text-lg font-semibold text-gray-600">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500 font-medium">Error loading users</div>;
  }

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-gray-600 mb-4">
        <Link to="/" className="flex items-center hover:text-gray-800 transition">
          <HomeIcon className="h-5 w-5 mr-1" />
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-semibold">Users</span>
      </div>

      {/* Users Table Component */}
      <div className="overflow-hidden rounded-lg shadow-xs border border-gray-200 bg-white">
        {/* Table Header */}
        <div className="flex justify-between items-center bg-gray-50 px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-800">Users</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search users..."
              className="border border-gray-300 px-3 py-1 text-sm rounded-md focus:ring-1 focus:ring-gray-400 outline-none text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link
              to="/users/add"
              className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition text-sm"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add User</span>
            </Link>
          </div>
        </div>

        <div className='mx-4'>


          {/* Table */}
          <table className="min-w-full border-collapse ">
            <thead>
              <tr className="bg-gray-300 text-gray-800  text-sm ">
                <th className="px-6 py-3 text-left font-semibold ">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.data?.map((user, index) => (
                <tr key={user.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition`}>
                  <td className="px-6 py-4 text-gray-700">{user.full_name}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center space-x-4">
                      <Link to={`/users/edit/${user.id}`} className="text-gray-500 hover:text-gray-700 transition">
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button className="text-red-500 hover:text-red-700 transition">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className='mx-2'>
            <Pagination page={page} lastPage={users?.last_page || 1} setPage={setPage} />

          </div>
        </div>
      </div>

    </div>
  );
}
