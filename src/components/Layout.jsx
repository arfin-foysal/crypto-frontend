import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineLogout, AiOutlineDown, AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import Sidebar from './Sidebar';
import { logout } from '../store/slices/authSlice';
import toast from 'react-hot-toast';

export default function Layout({ children, user }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md">
          <div className="flex justify-between items-center px-4 py-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-indigo-800 hover:bg-indigo-50 transition-colors duration-200"
            >
              <AiOutlineMenu className="h-6 w-6" />
            </button>

            {/* User Profile with Dropdown */}
            <div className="relative flex items-center space-x-4">
              <div className="flex items-center space-x-2 cursor-pointer mr-4 " onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img 
                  src={user?.avatar || '/default-avatar.png'} 
                  alt="User Avatar" 
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-gray-600 font-medium text-sm">{user?.name} Foysal</span>
                <AiOutlineDown className={`h-4 w-4 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div 
                  ref={dropdownRef} 
                  className="absolute right-0 mt-40  w-48 bg-white shadow-md rounded-lg border border-gray-200 text-sm"
                >
                  {/* Profile Button */}
                  <button
                    onClick={handleProfile}
                    className="w-full flex items-center px-4 py-2 text-indigo-800 hover:bg-indigo-50 transition-colors duration-200"
                  >
                    <AiOutlineUser className="h-5 w-5 mr-2" />
                    Profile
                  </button>
                  {/* Change Password Button */}
                  {/* <button
                    onClick={handleChangePassword}
                    className="w-full flex items-center px-4 py-2 text-indigo-800 hover:bg-indigo-50 transition-colors duration-200"
                  >
                    <AiOutlineLock className="h-5 w-5 mr-2" />
                    Change Password
                  </button> */}
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-indigo-800 hover:text-red-600 transition-colors duration-200"
                  >
                    <AiOutlineLogout className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="container-fluid mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
