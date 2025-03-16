import React, { useState } from 'react';
import { Save, Clock, MapPin, CreditCard, Bell, Shield, Truck } from 'lucide-react';
import AdminLayout from './AdminLayout';

const Settings: React.FC = () => {
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "Ginni's Cafe",
    storeEmail: "info@ginniscafe.com",
    storePhone: "+91 9876543210",
    storeAddress: "123 Cake Street, Sweet Lane, Dessert City - 400001",
    currency: "₹",
    taxRate: "5"
  });

  const [deliverySettings, setDeliverySettings] = useState({
    deliveryRadius: "10",
    deliveryFee: "40",
    freeDeliveryThreshold: "500",
    estimatedDeliveryTime: "30-45"
  });

  const [paymentSettings, setPaymentSettings] = useState({
    acceptCash: true,
    acceptUPI: true,
    acceptCards: true,
    acceptWallets: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    orderStatusUpdate: true,
    orderDelivery: true,
    promotions: false
  });

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGeneralSettings({
      ...generalSettings,
      [e.target.name]: e.target.value
    });
  };

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliverySettings({
      ...deliverySettings,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentSettings({
      ...paymentSettings,
      [e.target.name]: e.target.checked
    });
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({
      ...notificationSettings,
      [e.target.name]: e.target.checked
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save settings to the database
    alert('Settings saved successfully!');
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600">Configure your store settings</p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center">
            <Shield className="h-5 w-5 mr-2 text-pink-600" />
            General Settings
          </h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                  Store Name
                </label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  value={generalSettings.storeName}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div>
                <label htmlFor="storeEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Store Email
                </label>
                <input
                  type="email"
                  id="storeEmail"
                  name="storeEmail"
                  value={generalSettings.storeEmail}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div>
                <label htmlFor="storePhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Store Phone
                </label>
                <input
                  type="text"
                  id="storePhone"
                  name="storePhone"
                  value={generalSettings.storePhone}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  id="currency"
                  name="currency"
                  value={generalSettings.currency}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="storeAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Store Address
                </label>
                <textarea
                  id="storeAddress"
                  name="storeAddress"
                  rows={3}
                  value={generalSettings.storeAddress}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div>
                <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  id="taxRate"
                  name="taxRate"
                  value={generalSettings.taxRate}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center">
            <Truck className="h-5 w-5 mr-2 text-pink-600" />
            Delivery Settings
          </h2>
        </div>
        <div className="p-6">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="deliveryRadius" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Radius (km)
                </label>
                <input
                  type="number"
                  id="deliveryRadius"
                  name="deliveryRadius"
                  value={deliverySettings.deliveryRadius}
                  onChange={handleDeliveryChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div>
                <label htmlFor="deliveryFee" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Fee (₹)
                </label>
                <input
                  type="number"
                  id="deliveryFee"
                  name="deliveryFee"
                  value={deliverySettings.deliveryFee}
                  onChange={handleDeliveryChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div>
                <label htmlFor="freeDeliveryThreshold" className="block text-sm font-medium text-gray-700 mb-1">
                  Free Delivery Threshold (₹)
                </label>
                <input
                  type="number"
                  id="freeDeliveryThreshold"
                  name="freeDeliveryThreshold"
                  value={deliverySettings.freeDeliveryThreshold}
                  onChange={handleDeliveryChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div>
                <label htmlFor="estimatedDeliveryTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Delivery Time (minutes)
                </label>
                <input
                  type="text"
                  id="estimatedDeliveryTime"
                  name="estimatedDeliveryTime"
                  value={deliverySettings.estimatedDeliveryTime}
                  onChange={handleDeliveryChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-pink-600" />
              Payment Methods
            </h2>
          </div>
          <div className="p-6">
            <form>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="acceptCash"
                    name="acceptCash"
                    checked={paymentSettings.acceptCash}
                    onChange={handlePaymentChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="acceptCash" className="ml-2 block text-sm text-gray-700">
                    Cash on Delivery
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="acceptUPI"
                    name="acceptUPI"
                    checked={paymentSettings.acceptUPI}
                    onChange={handlePaymentChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="acceptUPI" className="ml-2 block text-sm text-gray-700">
                    UPI Payments
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="acceptCards"
                    name="acceptCards"
                    checked={paymentSettings.acceptCards}
                    onChange={handlePaymentChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="acceptCards" className="ml-2 block text-sm text-gray-700">
                    Credit/Debit Cards
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="acceptWallets"
                    name="acceptWallets"
                    checked={paymentSettings.acceptWallets}
                    onChange={handlePaymentChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="acceptWallets" className="ml-2 block text-sm text-gray-700">
                    Digital Wallets
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold flex items-center">
              <Bell className="h-5 w-5 mr-2 text-pink-600" />
              Notification Settings
            </h2>
          </div>
          <div className="p-6">
            <form>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="orderConfirmation"
                    name="orderConfirmation"
                    checked={notificationSettings.orderConfirmation}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="orderConfirmation" className="ml-2 block text-sm text-gray-700">
                    Order Confirmation
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="orderStatusUpdate"
                    name="orderStatusUpdate"
                    checked={notificationSettings.orderStatusUpdate}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="orderStatusUpdate" className="ml-2 block text-sm text-gray-700">
                    Order Status Updates
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="orderDelivery"
                    name="orderDelivery"
                    checked={notificationSettings.orderDelivery}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="orderDelivery" className="ml-2 block text-sm text-gray-700">
                    Order Delivery
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="promotions"
                    name="promotions"
                    checked={notificationSettings.promotions}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="promotions" className="ml-2 block text-sm text-gray-700">
                    Promotions and Offers
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <button
          type="submit"
          onClick={handleSubmit}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Settings
        </button>
      </div>
    </AdminLayout>
  );
};

export default Settings;