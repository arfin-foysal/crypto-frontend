import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineDown
} from 'react-icons/ai';
import { IoIosArrowDropright } from "react-icons/io";

const menuItems = [
  {
    title: 'Dashboard',
    icon: AiOutlineHome,
    path: '/dashboard',
  },
  {
    title: 'User Management',
    icon: AiOutlineUser,
    submenu: [
      { title: 'All Users', path: '/users' },
      { title: 'Add User', path: '/users/add' },
      { title: 'Roles', path: '/users/roles' },
    ],
  },
  {
    title: 'Products',
    icon: AiOutlineShoppingCart,
    submenu: [
      { title: 'All Products', path: '/products' },
      { title: 'Add Product', path: '/products/add' },
      { title: 'Categories', path: '/products/categories' },
    ],
  },
  {
    title: 'Analytics',
    icon: AiOutlineBarChart,
    path: '/analytics',
  },
  {
    title: 'Settings',
    icon: AiOutlineSetting,
    path: '/settings',
  },
];

function MenuItem({ item, isOpen }) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const location = useLocation();
  const Icon = item.icon;
  const isActive = location.pathname === item.path || 
    (item.submenu && item.submenu.some(subItem => location.pathname === subItem.path));

  if (item.submenu) {
    return (
      <div className="mb-2">
        <button
          className={`w-full flex items-center justify-between px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 ${
            isActive ? 'bg-gray-200' : ''
          }`}
          onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
        >
          <div className="flex items-center">
            <Icon className="w-5 h-5 min-w-[20px] min-h-[20px] mr-2" />
            {isOpen && <span className="text-sm font-medium">{item.title}</span>}
          </div>
          {isOpen && (
            <AiOutlineDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isSubmenuOpen ? 'transform rotate-180' : ''
              }`}
            />
          )}
        </button>
        {isSubmenuOpen && isOpen && (
          <div className="mt-1 space-y-1  pl-2">
            {item.submenu.map((subItem) => (
              <Link
                key={subItem.path}
                to={subItem.path}
                className={`block py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200 ${
                  location.pathname === subItem.path ? 'bg-gray-200' : ''
                }`}
              >
                <IoIosArrowDropright className="inline-block mx-2" />
                <span className="ml-2 my-2">{subItem.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      className={`flex items-center ${isOpen ? 'px-3 justify-start' : 'justify-center'} py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 mb-2 ${
        isActive ? 'bg-gray-200' : ''
      }`}
    >
      <Icon className="w-5 h-5 min-w-[20px] min-h-[20px]" />
      {isOpen && <span className="ml-2 text-sm font-medium">{item.title}</span>}
    </Link>
  );
}

export default function Sidebar({ isOpen }) {
  return (
    <div 
      className={`bg-white border-r border-gray-200 ${
        isOpen ? 'w-64' : 'w-16'
      } min-h-screen p-3 transition-all duration-300 flex flex-col`}
    >
      <div className={`text-gray-800 text-lg font-semibold mb-6 px-2 ${!isOpen && 'text-center'}`}>
        {isOpen ? 'Crypto Panel' : 'CP'}
      </div>
      <nav className="flex-grow">
        {menuItems.map((item) => (
          <MenuItem key={item.title} item={item} isOpen={isOpen} />
        ))}
      </nav>
      {/* Optional: Add a footer or other elements here */}
    </div>
  );
}