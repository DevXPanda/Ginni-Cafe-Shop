import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Clock, Truck, Package, ShoppingBag, ArrowLeft } from 'lucide-react';

interface OrderStatus {
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  timestamp: string;
  completed: boolean;
}

const OrderTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch order details from the API
    // For demo purposes, we'll simulate an API call with a timeout
    const fetchOrder = async () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // Mock order data
        const mockOrder = {
          id: orderId,
          customer: {
            name: 'Priya Sharma',
            phone: '+91 9876543210',
            address: '123 Main Street, Apartment 4B, Mumbai, Maharashtra - 400001'
          },
          items: [
            { name: 'Chocolate Truffle Cake', quantity: 1, price: 599 },
            { name: 'Chocolate Pastry', quantity: 3, price: 100 }
          ],
          total: 899,
          paymentMethod: 'UPI',
          placedAt: '2025-05-15 14:30',
          estimatedDelivery: '2025-05-15 15:45',
          deliveryPerson: {
            name: 'Rahul',
            phone: '+91 9876543220'
          },
          statuses: [
            { status: 'Pending', timestamp: '2025-05-15 14:30', completed: true },
            { status: 'Confirmed', timestamp: '2025-05-15 14:35', completed: true },
            { status: 'Preparing', timestamp: '2025-05-15 14:45', completed: true },
            { status: 'Out for Delivery', timestamp: '2025-05-15 15:15', completed: true },
            { status: 'Delivered', timestamp: '2025-05-15 15:40', completed: false }
          ] as OrderStatus[]
        };
        
        setOrder(mockOrder);
        setLoading(false);
      }, 1000);
    };
    
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <p className="text-gray-600 mb-6">
          We couldn't find the order you're looking for.
        </p>
        <Link 
          to="/" 
          className="bg-pink-600 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-700 transition-colors inline-flex items-center"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </div>
    );
  }

  const currentStatus = order.statuses.findIndex(status => !status.completed);
  const statusIcons = {
    'Pending': <Clock className="h-6 w-6" />,
    'Confirmed': <CheckCircle className="h-6 w-6" />,
    'Preparing': <Package className="h-6 w-6" />,
    'Out for Delivery': <Truck className="h-6 w-6" />,
    'Delivered': <ShoppingBag className="h-6 w-6" />
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/" className="text-pink-600 hover:text-pink-700 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-pink-600 text-white px-6 py-4">
          <h1 className="text-xl font-bold">Order #{order.id}</h1>
          <p className="text-sm opacity-90">Placed on {order.placedAt}</p>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Order Status</h2>
            <div className="relative">
              {/* Progress bar */}
              <div className="absolute top-5 left-5 right-5 h-1 bg-gray-200">
                <div 
                  className="h-full bg-pink-600" 
                  style={{ width: `${(currentStatus / (order.statuses.length - 1)) * 100}%` }}
                ></div>
              </div>
              
              {/* Status steps */}
              <div className="flex justify-between relative">
                {order.statuses.map((status: OrderStatus, index: number) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      index < currentStatus ? 'bg-pink-600 text-white' : 
                      index === currentStatus ? 'bg-pink-100 text-pink-600 border-2 border-pink-600' : 
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {statusIcons[status.status]}
                    </div>
                    <div className="text-xs font-medium mt-2 text-center">
                      {status.status}
                    </div>
                    {status.completed && (
                      <div className="text-xs text-gray-500 mt-1">
                        {status.timestamp.split(' ')[1]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500 uppercase mb-2">Delivery Address</h2>
              <p className="text-gray-900 font-medium">{order.customer.name}</p>
              <p className="text-gray-600">{order.customer.phone}</p>
              <p className="text-gray-600">{order.customer.address}</p>
            </div>
            
            <div>
              <h2 className="text-sm font-medium text-gray-500 uppercase mb-2">Order Information</h2>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="text-gray-900">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span className="text-gray-900">{order.estimatedDelivery}</span>
                </div>
              </div>
            </div>
          </div>
          
          {currentStatus >= 3 && (
            <div className="bg-blue-50 p-4 rounded-md mb-6">
              <h2 className="text-sm font-medium text-blue-800 mb-2">Delivery Partner</h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-blue-800 font-medium">{order.deliveryPerson.name}</p>
                  <p className="text-blue-600">{order.deliveryPerson.phone}</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                  Call
                </button>
              </div>
            </div>
          )}
          
          <div>
            <h2 className="text-sm font-medium text-gray-500 uppercase mb-2">Order Items</h2>
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Item
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 text-center">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        ₹{(item.quantity * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={2} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      Subtotal:
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      ₹{order.total.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      Delivery Fee:
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      ₹40.00
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      Tax:
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      ₹{(order.total * 0.05).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="px-4 py-3 text-base font-bold text-gray-900 text-right">
                      Total:
                    </td>
                    <td className="px-4 py-3 text-base font-bold text-gray-900 text-right">
                      ₹{(order.total + 40 + order.total * 0.05).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-gray-600 mb-4">Need help with your order?</p>
        <button className="bg-pink-600 text-white px-6 py-2 rounded-full font-medium hover:bg-pink-700 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;