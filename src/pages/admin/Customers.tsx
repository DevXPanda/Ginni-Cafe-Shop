import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, Calendar, Eye } from 'lucide-react';
import AdminLayout from './AdminLayout';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => {
    return (
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-gray-600">Manage and view customer information</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search customers by name, email or phone..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.joinedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.totalOrders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewCustomer(customer)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {isModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Customer Details
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-xl font-bold mb-2">{selectedCustomer.name}</h4>
                <div className="flex items-center text-gray-600 mb-2">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Joined on {selectedCustomer.joinedDate}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Order Summary</h5>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Total Orders:</span>
                    <span className="font-medium">{selectedCustomer.totalOrders}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Total Spent:</span>
                    <span className="font-medium">₹{selectedCustomer.totalSpent.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Order:</span>
                    <span className="font-medium">{selectedCustomer.lastOrderDate}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Customer Preferences</h5>
                  <div className="text-gray-600">
                    <p>Most ordered category: <span className="font-medium">Cakes</span></p>
                    <p>Favorite item: <span className="font-medium">Chocolate Truffle Cake</span></p>
                    <p>Preferred payment: <span className="font-medium">UPI</span></p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h5 className="font-semibold mb-2">Recent Orders</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 text-sm">#1001</td>
                        <td className="px-4 py-2 text-sm">2025-05-15</td>
                        <td className="px-4 py-2 text-sm">₹899.00</td>
                        <td className="px-4 py-2 text-sm">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm">#1008</td>
                        <td className="px-4 py-2 text-sm">2025-05-02</td>
                        <td className="px-4 py-2 text-sm">₹649.00</td>
                        <td className="px-4 py-2 text-sm">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm">#1012</td>
                        <td className="px-4 py-2 text-sm">2025-04-18</td>
                        <td className="px-4 py-2 text-sm">₹1,299.00</td>
                        <td className="px-4 py-2 text-sm">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Send Message
                </button>
                <button
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  View All Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

// Mock data for demonstration
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 9876543210',
    joinedDate: '2025-01-15',
    totalOrders: 8,
    totalSpent: 5899,
    lastOrderDate: '2025-05-15'
  },
  {
    id: '2',
    name: 'Rahul Patel',
    email: 'rahul.patel@example.com',
    phone: '+91 9876543211',
    joinedDate: '2025-02-20',
    totalOrders: 5,
    totalSpent: 3299,
    lastOrderDate: '2025-05-14'
  },
  {
    id: '3',
    name: 'Anita Desai',
    email: 'anita.desai@example.com',
    phone: '+91 9876543212',
    joinedDate: '2025-03-10',
    totalOrders: 3,
    totalSpent: 1499,
    lastOrderDate: '2025-05-14'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    phone: '+91 9876543213',
    joinedDate: '2025-03-25',
    totalOrders: 4,
    totalSpent: 2999,
    lastOrderDate: '2025-05-13'
  },
  {
    id: '5',
    name: 'Neha Gupta',
    email: 'neha.gupta@example.com',
    phone: '+91 9876543214',
    joinedDate: '2025-04-05',
    totalOrders: 2,
    totalSpent: 1599,
    lastOrderDate: '2025-05-12'
  },
  {
    id: '6',
    name: 'Arjun Kumar',
    email: 'arjun.kumar@example.com',
    phone: '+91 9876543215',
    joinedDate: '2025-04-18',
    totalOrders: 1,
    totalSpent: 1099,
    lastOrderDate: '2025-05-11'
  },
  {
    id: '7',
    name: 'Meera Reddy',
    email: 'meera.reddy@example.com',
    phone: '+91 9876543216',
    joinedDate: '2025-05-01',
    totalOrders: 1,
    totalSpent: 399,
    lastOrderDate: '2025-05-10'
  }
];

export default Customers;