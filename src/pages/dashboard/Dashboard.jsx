import React from 'react';
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineDollar,
  AiOutlineBarChart,
  AiOutlineClockCircle,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from 'react-icons/ai';

function Dashboard() {
  // Dummy data
  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      icon: AiOutlineUser,
      change: '+12.5%',
      isIncrease: true,
    },
    {
      title: 'Total Orders',
      value: '1,234',
      icon: AiOutlineShoppingCart,
      change: '+8.2%',
      isIncrease: true,
    },
    {
      title: 'Revenue',
      value: '$45,678',
      icon: AiOutlineDollar,
      change: '-3.1%',
      isIncrease: false,
    },
    {
      title: 'Conversion Rate',
      value: '2.4%',
      icon: AiOutlineBarChart,
      change: '+4.3%',
      isIncrease: true,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'placed a new order',
      time: '5 minutes ago',
      amount: '$250.00',
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'registered new account',
      time: '15 minutes ago',
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'updated their profile',
      time: '1 hour ago',
    },
    {
      id: 4,
      user: 'Sarah Williams',
      action: 'placed a new order',
      time: '2 hours ago',
      amount: '$120.00',
    },
  ];

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Admin!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-500" />
              </div>
              <span className={`flex items-center text-sm ${stat.isIncrease ? 'text-green-500' : 'text-red-500'}`}>
                {stat.isIncrease ? <AiOutlineArrowUp className="mr-1" /> : <AiOutlineArrowDown className="mr-1" />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h2>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart placeholder</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="p-2 bg-blue-50 rounded-full">
                  <AiOutlineClockCircle className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium text-gray-800">{activity.user}</span>
                    {' '}{activity.action}
                    {activity.amount && <span className="font-medium text-gray-800">{' '}{activity.amount}</span>}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full text-sm text-blue-500 hover:text-blue-600 font-medium">
            View All Activity
          </button>
        </div>
      </div>

      {/* Additional Stats or Tables can be added here */}
    </div>
  );
}

export default Dashboard;
