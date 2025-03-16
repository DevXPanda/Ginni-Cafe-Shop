import React, { useState } from 'react';
import { Search, Filter, Eye, Download, Phone, MapPin, Clock, CheckCircle, X as XIcon, Truck } from 'lucide-react';
import AdminLayout from './AdminLayout';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  date: string;
  status: 'Pending' | 'Processing' | 'Out for Delivery' | 'Completed' | 'Cancelled';
  amount: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  address: string;
  paymentMethod: string;
  deliveryPerson?: {
    name: string;
    phone: string;
  };
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignDeliveryOpen, setIsAssignDeliveryOpen] = useState(false);
  const [deliveryPersonName, setDeliveryPersonName] = useState('');
  const [deliveryPersonPhone, setDeliveryPersonPhone] = useState('');

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleAssignDelivery = () => {
    if (selectedOrder && deliveryPersonName && deliveryPersonPhone) {
      const updatedOrder = {
        ...selectedOrder,
        deliveryPerson: {
          name: deliveryPersonName,
          phone: deliveryPersonPhone
        },
        status: 'Out for Delivery' as Order['status']
      };
      
      setOrders(orders.map(order => 
        order.id === selectedOrder.id ? updatedOrder : order
      ));
      
      setSelectedOrder(updatedOrder);
      setIsAssignDeliveryOpen(false);
      setDeliveryPersonName('');
      setDeliveryPersonPhone('');
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'Processing':
        return <CheckCircle className="h-5 w-5 text-yellow-500" />;
      case 'Out for Delivery':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Cancelled':
        return <XIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-gray-600">Manage customer orders</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="out for delivery">Out for Delivery</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                    <div className="text-sm text-gray-500">{order.customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                        order.status === 'Pending' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Out for Delivery' ? 'bg-purple-100 text-purple-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Download className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold flex items-center">
                Order #{selectedOrder.id}
                <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  selectedOrder.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                  selectedOrder.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                  selectedOrder.status === 'Pending' ? 'bg-blue-100 text-blue-800' :
                  selectedOrder.status === 'Out for Delivery' ? 'bg-purple-100 text-purple-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedOrder.status}
                </span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Customer Information</h4>
                  <p className="text-gray-900 font-medium">{selectedOrder.customer.name}</p>
                  <p className="text-gray-600">{selectedOrder.customer.email}</p>
                  <div className="flex items-center mt-1">
                    <Phone className="h-4 w-4 text-gray-400 mr-1" />
                    <p className="text-gray-600">{selectedOrder.customer.phone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Order Information</h4>
                  <p className="text-gray-600">Date: {selectedOrder.date}</p>
                  <p className="text-gray-600">Payment Method: {selectedOrder.paymentMethod}</p>
                  <div className="mt-2">
                    <label className="text-sm text-gray-600 mr-2">Status:</label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as Order['status'])}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Shipping Address</h4>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-1 mt-0.5" />
                  <p className="text-gray-600">{selectedOrder.address}</p>
                </div>
              </div>

              {selectedOrder.deliveryPerson ? (
                <div className="mb-6 bg-purple-50 p-4 rounded-md">
                  <h4 className="text-sm font-medium text-purple-800 uppercase mb-2">Delivery Person</h4>
                  <p className="text-purple-800 font-medium">{selectedOrder.deliveryPerson.name}</p>
                  <div className="flex items-center mt-1">
                    <Phone className="h-4 w-4 text-purple-600 mr-1" />
                    <p className="text-purple-600">{selectedOrder.deliveryPerson.phone}</p>
                  </div>
                </div>
              ) : (
                selectedOrder.status === 'Processing' && (
                  <div className="mb-6">
                    <button
                      onClick={() => setIsAssignDeliveryOpen(true)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors"
                    >
                      Assign Delivery Person
                    </button>
                  </div>
                )
              )}

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Order Items</h4>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Item
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          Qty
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          Price
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500 text-right">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500 text-right">
                            ₹{item.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 font-medium text-right">
                            ₹{(item.quantity * item.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{selectedOrder.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">₹40.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">₹{(selectedOrder.amount * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                  <span>Total</span>
                  <span>₹{(selectedOrder.amount + 40 + selectedOrder.amount * 0.05).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Delivery Person Modal */}
      {isAssignDeliveryOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Assign Delivery Person
              </h3>
              <button
                onClick={() => setIsAssignDeliveryOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label htmlFor="deliveryPersonName" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Person Name
                </label>
                <input
                  type="text"
                  id="deliveryPersonName"
                  value={deliveryPersonName}
                  onChange={(e) => setDeliveryPersonName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="deliveryPersonPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Person Phone
                </label>
                <input
                  type="text"
                  id="deliveryPersonPhone"
                  value={deliveryPersonPhone}
                  onChange={(e) => setDeliveryPersonPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              <button
                onClick={() => setIsAssignDeliveryOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignDelivery}
                disabled={!deliveryPersonName || !deliveryPersonPhone}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                Assign & Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: '1001',
    customer: {
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 9876543210'
    },
    date: '2025-05-15',
    status: 'Completed',
    amount: 899,
    items: [
      { name: 'Chocolate Truffle Cake', quantity: 1, price: 599 },
      { name: 'Chocolate Pastry', quantity: 3, price: 100 }
    ],
    address: '123 Main Street, Apartment 4B, Mumbai, Maharashtra - 400001',
    paymentMethod: 'Credit Card',
    deliveryPerson: {
      name: 'Rahul',
      phone: '+91 9876543220'
    }
  },
  {
    id: '1002',
    customer: {
      name: 'Rahul Patel',
      email: 'rahul.patel@example.com',
      phone: '+91 9876543211'
    },
    date: '2025-05-14',
    status: 'Processing',
    amount: 1299,
    items: [
      { name: 'Birthday Decoration Kit', quantity: 1, price: 999 },
      { name: 'Red Velvet Cake', quantity: 1, price: 300 }
    ],
    address: '456 Park Avenue, Delhi - 110001',
    paymentMethod: 'UPI'
  },
  {
    id: '1003',
    customer: {
      name: 'Anita Desai',
      email: 'anita.desai@example.com',
      phone: '+91 9876543212'
    },
    date: '2025-05-14',
    status: 'Out for Delivery',
    amount: 499,
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 299 },
      { name: 'Paneer Roll', quantity: 1, price: 200 }
    ],
    address: '789 Lake View, Bangalore - 560001',
    paymentMethod: 'Cash on Delivery',
    deliveryPerson: {
      name: 'Vikram',
      phone: '+91 9876543221'
    }
  },
  {
    id: '1004',
    customer: {
      name: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      phone: '+91 9876543213'
    },
    date: '2025-05-13',
    status: 'Processing',
    amount: 1499,
    items: [
      { name: 'Party Balloon Set', quantity: 2, price: 499 },
      { name: 'Blueberry Cheesecake', quantity: 1, price: 501 }
    ],
    address: '101 Hill Road, Chennai - 600001',
    paymentMethod: 'UPI'
  },
  {
    id: '1005',
    customer: {
      name: 'Neha Gupta',
      email: 'neha.gupta@example.com',
      phone: '+91 9876543214'
    },
    date: '2025-05-12',
    status: 'Completed',
    amount: 799,
    items: [
      { name: 'Pepperoni Pizza', quantity: 2, price: 349 },
      { name: 'Classic Cheeseburger', quantity: 1, price: 101 }
    ],
    address: '202 River View, Kolkata - 700001',
    paymentMethod: 'Credit Card',
    deliveryPerson: {
      name: 'Amit',
      phone: '+91 9876543222'
    }
  },
  {
    id: '1006',
    customer: {
      name: 'Arjun Kumar',
      email: 'arjun.kumar@example.com',
      phone: '+91 9876543215'
    },
    date: '2025-05-11',
    status: 'Pending',
    amount: 1099,
    items: [
      { name: 'Birthday Candles Pack', quantity: 1, price: 149 },
      { name: 'Chocolate Truffle Cake', quantity: 1, price: 599 },
      { name: 'Party Balloon Set', quantity: 1, price: 351 }
    ],
    address: '303 Mountain View, Hyderabad - 500001',
    paymentMethod: 'UPI'
  },
  {
    id: '1007',
    customer: {
      name: 'Meera Reddy',
      email: 'meera.reddy@example.com',
      phone: '+91 9876543216'
    },
    date: '2025-05-10',
    status: 'Cancelled',
    amount: 399,
    items: [
      { name: 'Chicken Burger', quantity: 2, price: 179 },
      { name: 'Chocolate Pastry', quantity: 1, price: 41 }
    ],
    address: '404 Ocean View, Pune - 411001',
    paymentMethod: 'Cash on Delivery'
  }
];

export default Orders;