import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../store/api/apiSlice';

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUserByIdQuery(id);
  const [updateUser] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: { name: '' },
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ id, ...formData }).unwrap();
      navigate('/users');
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'companyName') {
      setFormData(prev => ({
        ...prev,
        company: { ...prev.company, name: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.company.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => navigate('/users')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}