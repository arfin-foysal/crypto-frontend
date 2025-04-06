
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { HomeIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { usePostApiMutation } from '../../store/api/commonSlice';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  address: Yup.string()
    .max(200, 'Address must be less than 200 characters'),
  description: Yup.string()
    .max(500, 'Description must be less than 500 characters'),
  account_type: Yup.string()
    .oneOf(['CHECKING', 'SAVINGS', 'BUSINESS', 'CREDIT'])
    .default('CHECKING'),
  status: Yup.string()
    .oneOf(['PENDING', 'ACTIVE', 'INACTIVE'])
    .default('PENDING')
});

export default function AddBank() {
  const navigate = useNavigate();
  const [postApi] = usePostApiMutation();

  const initialValues = {
    name: '',
    address: '',
    description: '',
    account_type: 'CHECKING',
    status: 'PENDING'
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await postApi({
        end_point: 'banks',
        body: values
      }).unwrap();

      toast.success('Bank added successfully');
      navigate('/banks');
    } catch (error) {
      toast.error(error?.data?.errors || 'Failed to add bank');
      console.error('Error adding bank:', error);
    } finally {
      setSubmitting(false);
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
          <Link to="/banks" className="flex items-center hover:text-gray-700 transition">
            Banks
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Add Bank</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Bank</h1>
        <p className="text-gray-600 mt-1">Create a new bank in the system</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter bank name"
                  />
                  <ErrorMessage name="name" component="div" className="text-sm text-red-500 mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                  <Field
                    as="select"
                    name="account_type"
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="CHECKING">Checking</option>
                    {/* <option value="SAVINGS">Savings</option>
                    <option value="BUSINESS">Business</option>
                    <option value="CREDIT">Credit</option> */}
                  </Field>
                  <ErrorMessage name="account_type" component="div" className="text-sm text-red-500 mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <Field
                    type="text"
                    name="address"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter bank address"
                  />
                  <ErrorMessage name="address" component="div" className="text-sm text-red-500 mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Field
                    as="select"
                    name="status"
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-sm text-red-500 mt-1" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Field
                    as="textarea"
                    name="description"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter bank description"
                    rows="3"
                  />
                  <ErrorMessage name="description" component="div" className="text-sm text-red-500 mt-1" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/banks')}
                  className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Adding...' : 'Add Bank'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
