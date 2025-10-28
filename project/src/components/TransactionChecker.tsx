import React, { useState } from 'react';
import { Search, CreditCard, MapPin, Store, Smartphone, Calendar } from 'lucide-react';
import { FraudResult } from './FraudResult';

interface TransactionData {
  transactionId: string;
  cardNumber: string;
  amount: number;
  timestamp: string;
  merchantName: string;
  merchantCategory: string;
  location: string;
  channel: string;
  customerLocation: string;
}

export function TransactionChecker() {
  const [formData, setFormData] = useState<TransactionData>({
    transactionId: '',
    cardNumber: '',
    amount: 0,
    timestamp: '',
    merchantName: '',
    merchantCategory: '',
    location: '',
    channel: '',
    customerLocation: '',
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate realistic fraud detection result
    const fraudScore = Math.random();
    const isHighAmount = formData.amount > 25000;
    const isUnusualTime = new Date(formData.timestamp).getHours() < 6 || new Date(formData.timestamp).getHours() > 22;
    const isDifferentLocation = formData.location !== formData.customerLocation;

    const features = [
      {
        name: 'Transaction Amount',
        importance: isHighAmount ? 0.35 : 0.12,
        value: `₹${formData.amount.toLocaleString()}`,
        explanation: isHighAmount ? 'Significantly above customer average of ₹8,500' : 'Within normal spending range',
      },
      {
        name: 'Transaction Time',
        importance: isUnusualTime ? 0.28 : 0.08,
        value: new Date(formData.timestamp).toLocaleTimeString(),
        explanation: isUnusualTime ? 'Outside typical usage hours (6 AM - 10 PM)' : 'Normal transaction time',
      },
      {
        name: 'Location Analysis',
        importance: isDifferentLocation ? 0.25 : 0.05,
        value: formData.location,
        explanation: isDifferentLocation ? 
          `Different from customer home location (${formData.customerLocation})` : 
          'Matches customer typical locations',
      },
      {
        name: 'Merchant Category',
        importance: 0.15,
        value: formData.merchantCategory,
        explanation: 'Category matches customer spending pattern',
      },
      {
        name: 'Device/Channel',
        importance: 0.10,
        value: formData.channel,
        explanation: 'Consistent with customer preferences',
      },
    ];

    const adjustedScore = Math.min(
      0.95,
      Math.max(
        0.05,
        fraudScore + 
        (isHighAmount ? 0.3 : 0) + 
        (isUnusualTime ? 0.2 : 0) + 
        (isDifferentLocation ? 0.25 : 0)
      )
    );

    setResult({
      fraudScore: adjustedScore,
      decision: adjustedScore > 0.7 ? 'FRAUD' : adjustedScore > 0.4 ? 'REVIEW' : 'APPROVED',
      recommendation: adjustedScore > 0.7 ? 'BLOCK' : adjustedScore > 0.4 ? 'FLAG_FOR_REVIEW' : 'APPROVE',
      features,
      explanation: generateExplanation(adjustedScore, isHighAmount, isUnusualTime, isDifferentLocation),
      processingTime: '1.23s',
    });

    setLoading(false);
  };

  const generateExplanation = (score: number, highAmount: boolean, unusualTime: boolean, differentLocation: boolean) => {
    const reasons = [];
    if (highAmount) reasons.push('transaction amount is significantly higher than usual');
    if (unusualTime) reasons.push('transaction occurred during unusual hours');
    if (differentLocation) reasons.push('transaction location differs from customer profile');

    if (score > 0.7) {
      return `Transaction flagged as FRAUD because ${reasons.join(', ')}.`;
    } else if (score > 0.4) {
      return `Transaction flagged for manual review due to ${reasons.join(' and ')}.`;
    } else {
      return 'Transaction approved - all parameters within normal customer behavior patterns.';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Transaction Fraud Analysis</h2>
          <p className="text-sm text-gray-600">Enter transaction details for real-time fraud detection</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transaction ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="inline h-4 w-4 mr-1" />
                Transaction ID
              </label>
              <input
                type="text"
                value={formData.transactionId}
                onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="TXN123456789"
                required
              />
            </div>

            {/* Credit Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Credit Card Number (Masked)
              </label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="XXXX-XXXX-1234"
                required
              />
            </div>

            {/* Transaction Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Amount (₹)
              </label>
              <input
                type="number"
                value={formData.amount || ''}
                onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="15000"
                required
              />
            </div>

            {/* Timestamp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Transaction Timestamp
              </label>
              <input
                type="datetime-local"
                value={formData.timestamp}
                onChange={(e) => setFormData({...formData, timestamp: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Merchant Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Store className="inline h-4 w-4 mr-1" />
                Merchant Name
              </label>
              <input
                type="text"
                value={formData.merchantName}
                onChange={(e) => setFormData({...formData, merchantName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Amazon India"
                required
              />
            </div>

            {/* Merchant Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Merchant Category
              </label>
              <select
                value={formData.merchantCategory}
                onChange={(e) => setFormData({...formData, merchantCategory: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Category</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Grocery">Grocery</option>
                <option value="Fuel">Fuel</option>
                <option value="Dining">Dining</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Transaction Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Transaction Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Mumbai, Maharashtra"
                required
              />
            </div>

            {/* Channel */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Smartphone className="inline h-4 w-4 mr-1" />
                Transaction Channel
              </label>
              <select
                value={formData.channel}
                onChange={(e) => setFormData({...formData, channel: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Channel</option>
                <option value="Online">Online</option>
                <option value="POS">Point of Sale (POS)</option>
                <option value="ATM">ATM</option>
                <option value="Mobile">Mobile App</option>
              </select>
            </div>

            {/* Customer Location */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Home Location
              </label>
              <input
                type="text"
                value={formData.customerLocation}
                onChange={(e) => setFormData({...formData, customerLocation: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Pune, Maharashtra"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            <span>{loading ? 'Analyzing...' : 'Analyze Transaction'}</span>
          </button>
        </form>
      </div>

      {result && <FraudResult result={result} transaction={formData} />}
    </div>
  );
}