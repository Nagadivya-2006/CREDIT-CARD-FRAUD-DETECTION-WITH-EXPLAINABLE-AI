import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Clock, CreditCard, MapPin, Smartphone } from 'lucide-react';

interface Transaction {
  id: string;
  cardNumber: string;
  amount: number;
  timestamp: string;
  merchant: string;
  location: string;
  channel: string;
  fraudScore: number;
  status: 'approved' | 'blocked' | 'review';
  explanation?: string;
}

export function LiveTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const generateTransaction = (): Transaction => {
      const merchants = ['Amazon India', 'Flipkart', 'Swiggy', 'BigBasket', 'Reliance Digital', 'DMart', 'BookMyShow', 'Paytm Mall'];
      const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'];
      const channels = ['Online', 'POS', 'ATM', 'Mobile'];
      
      const amount = Math.floor(Math.random() * 50000) + 100;
      const fraudScore = Math.random();
      
      return {
        id: `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`,
        cardNumber: `XXXX-XXXX-${Math.floor(Math.random() * 9000) + 1000}`,
        amount,
        timestamp: new Date().toLocaleTimeString(),
        merchant: merchants[Math.floor(Math.random() * merchants.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        channel: channels[Math.floor(Math.random() * channels.length)],
        fraudScore,
        status: fraudScore > 0.8 ? 'blocked' : fraudScore > 0.6 ? 'review' : 'approved',
        explanation: fraudScore > 0.6 ? 'High amount deviation from typical spending pattern' : undefined,
      };
    };

    // Add initial transactions
    const initialTransactions = Array.from({ length: 8 }, generateTransaction);
    setTransactions(initialTransactions);

    // Add new transactions periodically
    const interval = setInterval(() => {
      const newTransaction = generateTransaction();
      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'blocked':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'review':
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'blocked':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'review':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Live Transaction Feed</h2>
        <p className="text-sm text-gray-600">Real-time fraud detection results</p>
      </div>

      <div className="overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                index === 0 ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span className="font-mono text-sm text-gray-700">{transaction.cardNumber}</span>
                    <span className="text-xs text-gray-500">{transaction.timestamp}</span>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">₹{transaction.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{transaction.merchant}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{transaction.location}</span>
                        <Smartphone className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{transaction.channel}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        <span className="capitalize">{transaction.status}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Risk: {(transaction.fraudScore * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>

                  {transaction.explanation && (
                    <div className="mt-2 p-2 bg-yellow-50 rounded text-xs text-yellow-800">
                      <strong>AI Explanation:</strong> {transaction.explanation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}