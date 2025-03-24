import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAddUserMutation } from '../store/api/apiSlice';
import { AiOutlineUser, AiOutlineMail, AiOutlineBank, AiOutlineArrowLeft, AiOutlineCheck, AiOutlineQuestionCircle, AiOutlineBook } from 'react-icons/ai';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  companyName: Yup.string()
    .required('Company name is required')
});

export default function AddUser() {
  const navigate = useNavigate();
  const [addUser] = useAddUserMutation();

  const initialValues = {
    name: '',
    email: '',
    companyName: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const userData = {
        name: values.name,
        email: values.email,
        company: { name: values.companyName }
      };
      await addUser(userData).unwrap();
      toast.success('User added successfully');
      navigate('/users');
    } catch (error) {
      toast.error('Failed to add user');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/users')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <AiOutlineArrowLeft className="w-5 h-5" />
                <span>Back to Users</span>
              </button>
              <h1 className="text-2xl font-semibold text-gray-800">Add New User</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Section - Form */}
          <div className="col-span-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="p-8 space-y-6">
                      {/* Name Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <AiOutlineUser className="h-5 w-5 text-gray-400" />
                          </div>
                          <Field
                            type="text"
                            name="name"
                            placeholder="Enter full name"
                            className="pl-11 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          />
                        </div>
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="mt-2 text-sm text-red-500"
                        />
                      </div>

                      {/* Email Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <AiOutlineMail className="h-5 w-5 text-gray-400" />
                          </div>
                          <Field
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                            className="pl-11 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="mt-2 text-sm text-red-500"
                        />
                      </div>

                      {/* Company Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <AiOutlineBank className="h-5 w-5 text-gray-400" />
                          </div>
                          <Field
                            type="text"
                            name="companyName"
                            placeholder="Enter company name"
                            className="pl-11 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          />
                        </div>
                        <ErrorMessage
                          name="companyName"
                          component="div"
                          className="mt-2 text-sm text-red-500"
                        />
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="px-8 py-4 bg-gray-50 rounded-b-xl border-t border-gray-200 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => navigate('/users')}
                        className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 disabled:opacity-60 transition-colors duration-200"
                      >
                        {isSubmitting ? 'Adding...' : 'Add User'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          {/* Right Section - Help Card */}
          <div className="col-span-4">
            <div className="space-y-6">
              {/* Quick Guide Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <AiOutlineUser className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Quick Guide</h2>
                </div>
                <div className="space-y-4 text-gray-600">
                  <p className="text-sm">
                    Follow these steps to add a new user to the system:
                  </p>
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li className="pl-2">Enter the user's full legal name as it appears on official documents</li>
                    <li className="pl-2">Provide a valid business email address that will be used for login</li>
                    <li className="pl-2">Input the complete company name for proper organization mapping</li>
                  </ol>
                </div>
              </div>

              {/* Validation Rules Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <AiOutlineCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Validation Rules</h2>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-gray-400" />
                    <p>Name must be at least 2 characters long</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-gray-400" />
                    <p>Email must be in a valid format (e.g., user@company.com)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-gray-400" />
                    <p>Company name is required for organizational tracking</p>
                  </div>
                </div>
              </div>

              {/* Help & Support Card */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <AiOutlineQuestionCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Need Help?</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    If you're having trouble adding a new user or have questions, our support team is here to help.
                  </p>
                  <div className="space-y-3">
                    <a href="mailto:support@example.com" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                      <AiOutlineMail className="w-4 h-4" />
                      <span>support@example.com</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                      <AiOutlineBook className="w-4 h-4" />
                      <span>View Documentation</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
