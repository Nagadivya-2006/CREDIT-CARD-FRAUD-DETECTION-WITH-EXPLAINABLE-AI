import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Shield, TrendingUp, Info } from 'lucide-react';

interface FraudResultProps {
  result: {
    fraudScore: number;
    decision: string;
    recommendation: string;
    features: Array<{
      name: string;
      importance: number;
      value: string;
      explanation: string;
    }>;
    explanation: string;
    processingTime: string;
  };
  transaction: {
    transactionId: string;
    cardNumber: string;
    amount: number;
  };
}

export function FraudResult({ result, transaction }: FraudResultProps) {
  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'FRAUD':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'REVIEW':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'APPROVED':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case 'FRAUD':
        return <AlertTriangle className="h-6 w-6 text-red-600" />;
      case 'REVIEW':
        return <Clock className="h-6 w-6 text-yellow-600" />;
      case 'APPROVED':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      default:
        return <Info className="h-6 w-6 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Fraud Detection Result</h2>
              <p className="text-sm text-gray-600">Transaction ID: {transaction.transactionId}</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Processed in {result.processingTime}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Decision Banner */}
          <div className={`p-4 rounded-lg border-2 mb-6 ${getDecisionColor(result.decision)}`}>
            <div className="flex items-center space-x-3">
              {getDecisionIcon(result.decision)}
              <div>
                <h3 className="font-bold text-lg">Decision: {result.decision}</h3>
                <p className="text-sm opacity-90">
                  Recommendation: {result.recommendation.replace('_', ' ')}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-2xl font-bold">
                  {(result.fraudScore * 100).toFixed(1)}%
                </p>
                <p className="text-xs opacity-75">Fraud Probability</p>
              </div>
            </div>
          </div>

          {/* AI Explanation */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <Info className="h-4 w-4 mr-2 text-blue-600" />
              AI Explanation
            </h4>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">{result.explanation}</p>
            </div>
          </div>

          {/* Feature Importance */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-gray-600" />
              Feature Importance Analysis (SHAP Values)
            </h4>
            <div className="space-y-4">
              {result.features
                .sort((a, b) => b.importance - a.importance)
                .map((feature, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{feature.name}</span>
                    <span className="text-sm text-gray-600">
                      Impact: {(feature.importance * 100).toFixed(1)}%
                    </span>
                  </div>
                  
                  {/* Importance Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full ${
                        feature.importance > 0.2 ? 'bg-red-500' : 
                        feature.importance > 0.1 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.max(feature.importance * 100, 5)}%` }}
                    />
                  </div>
                  
                  <div className="text-sm">
                    <p className="text-gray-700"><strong>Value:</strong> {feature.value}</p>
                    <p className="text-gray-600">{feature.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Shield className="h-4 w-4" />
          <span>
            This analysis complies with RBI guidelines for digital payment fraud detection. 
            All customer data is processed securely and anonymized according to Indian data protection regulations.
          </span>
        </div>
      </div>
    </div>
  );
}