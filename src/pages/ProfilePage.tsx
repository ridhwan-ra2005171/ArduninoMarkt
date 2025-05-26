import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, User, CreditCard, LogOut } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

const ProfilePage: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // This would normally fetch from Supabase
    // For now, we'll use mock data
    if (user) {
      const mockOrders: Order[] = [
        {
          id: 'ORD-1234',
          date: '2024-06-15',
          total: 75.99,
          status: 'delivered',
          items: [
            { name: 'Arduino Starter Kit', quantity: 1, price: 49.99 },
            { name: 'HC-SR04 Ultrasonic Sensor', quantity: 2, price: 3.95 },
            { name: 'Micro Servo Motor SG90', quantity: 4, price: 4.50 }
          ]
        },
        {
          id: 'ORD-5678',
          date: '2024-06-01',
          total: 26.95,
          status: 'shipped',
          items: [
            { name: '16x2 LCD Display', quantity: 1, price: 9.95 },
            { name: 'ESP8266 WiFi Module', quantity: 1, price: 6.95 },
            { name: 'DS18B20 Temperature Sensor', quantity: 3, price: 3.50 }
          ]
        }
      ];
      setOrders(mockOrders);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00979D]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <div className="flex items-center">
                <div className="bg-[#00979D] text-white rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="font-bold">{user.email?.charAt(0).toUpperCase()}</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
            <nav className="p-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'profile'
                    ? 'bg-[#00979D] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User size={18} className="mr-2" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'orders'
                    ? 'bg-[#00979D] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ShoppingBag size={18} className="mr-2" />
                Order History
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'payment'
                    ? 'bg-[#00979D] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CreditCard size={18} className="mr-2" />
                Payment Methods
              </button>
              <button
                onClick={signOut}
                className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} className="mr-2" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                <form>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        readOnly
                        value={user.email || ''}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                      />
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00979D]"
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Shipping Address
                      </label>
                      <textarea
                        id="address"
                        rows={3}
                        placeholder="Enter your shipping address"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00979D]"
                      ></textarea>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="bg-[#00979D] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#007A7A] transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Order History</h2>
                
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <ShoppingBag size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-600">You haven't placed any orders yet.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                          <div>
                            <span className="font-medium text-gray-900">Order #{order.id}</span>
                            <span className="ml-4 text-sm text-gray-500">
                              {new Date(order.date).toLocaleDateString()}
                            </span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="p-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between py-2">
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="ml-2 text-sm text-gray-500">× {item.quantity}</span>
                              </div>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                            <span>Total</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'payment' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
                
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <CreditCard size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-4">You don't have any saved payment methods.</p>
                  <button
                    type="button"
                    className="bg-[#00979D] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#007A7A] transition-colors"
                  >
                    Add Payment Method
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;