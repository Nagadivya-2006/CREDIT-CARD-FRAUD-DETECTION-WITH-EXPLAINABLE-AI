import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, TrendingUp } from 'lucide-react';

export function HistoryView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock historical data
  const historicalTransactions = [
    {
      id: 'TXN001234567',
      timestamp: '2024-12-19 14:30:25',
      card: 'XXXX-XXXX-5432',
      amount: 45000,
      merchant: 'Electronics Mart',
      location: 'Mumbai',
      fraudScore: 0.85,
      decision: 'BLOCKED',
      explanation: 'High amount with unusual merchant category for customer profile',
    },
    {
      id: 'TXN001234568',
      timestamp: '2024-12-19 13:15:10',
      card: 'XXXX-XXXX-1234',
      amount: 2500,
      merchant: 'Swiggy',
      location: 'Delhi',
      fraudScore: 0.15,
      decision: 'APPROVED',
      explanation: 'Normal transaction within customer spending pattern',
    },
    {
      id: 'TXN001234569',
      timestamp: '2024-12-19 12:45:33',
      card: 'XXXX-XXXX-9876',
      amount: 15000,
      merchant: 'BookMyShow',
      location: 'Bangalore',
      fraudScore: 0.55,
      decision: 'REVIEW',
      explanation: 'Moderate risk due to transaction timing and amount',
    },
  ];

  const filteredTransactions = historicalTransactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || transaction.decision === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'BLOCKED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'REVIEW':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'APPROVED':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-gray-600">Total Analyzed</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-red-600">23</p>
              <p className="text-sm text-gray-600">Fraud Detected</p>
            </div>
            <div className="text-sm text-red-600">1.8% rate</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">98.7%</p>
              <p className="text-sm text-gray-600">Accuracy Rate</p>
            </div>
            <div className="text-sm text-green-600">+0.3%</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h2>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Transaction ID or Merchant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex space-x-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="APPROVED">Approved</option>
                <option value="BLOCKED">Blocked</option>
                <option value="REVIEW">Review</option>
              </select>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Merchant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Decision
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-mono text-sm font-medium text-gray-900">{transaction.id}</p>
                      <p className="text-xs text-gray-500">{transaction.timestamp}</p>
                      <p className="text-xs text-gray-500">{transaction.card}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">₹{transaction.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{transaction.location}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{transaction.merchant}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            transaction.fraudScore > 0.7 ? 'bg-red-500' : 
                            transaction.fraudScore > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${transaction.fraudScore * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-700">
                        {(transaction.fraudScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getDecisionColor(transaction.decision)}`}>
                      {transaction.decision}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}