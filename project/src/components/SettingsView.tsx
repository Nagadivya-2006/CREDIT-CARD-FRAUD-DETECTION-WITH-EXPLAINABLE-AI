import React, { useState } from 'react';
import { Shield, Bell, Database, Users, Lock, FileText } from 'lucide-react';

export function SettingsView() {
  const [settings, setSettings] = useState({
    fraudThreshold: 0.7,
    reviewThreshold: 0.4,
    alertsEnabled: true,
    realTimeMonitoring: true,
    dataRetention: 90,
    autoBlock: true,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* System Status */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">System Status & Compliance</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">RBI Compliance Status</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  ✓ Verified
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Data Encryption</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  AES-256 Active
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Model Performance</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  98.7% Accuracy
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Last Model Update</span>
                <span className="text-sm text-gray-600">2024-12-15 09:30 IST</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">System Uptime</span>
                <span className="text-sm text-gray-600">99.9% (30 days)</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Avg Response Time</span>
                <span className="text-sm text-gray-600">1.23 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detection Settings */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Fraud Detection Settings</h2>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fraud Alert Threshold
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0.5"
                max="0.9"
                step="0.05"
                value={settings.fraudThreshold}
                onChange={(e) => handleSettingChange('fraudThreshold', parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm font-medium text-gray-900 w-12">
                {(settings.fraudThreshold * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Transactions above this threshold will be automatically blocked
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manual Review Threshold
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0.2"
                max="0.7"
                step="0.05"
                value={settings.reviewThreshold}
                onChange={(e) => handleSettingChange('reviewThreshold', parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm font-medium text-gray-900 w-12">
                {(settings.reviewThreshold * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Transactions above this threshold will be flagged for manual review
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Real-time Alerts</label>
                <input
                  type="checkbox"
                  checked={settings.alertsEnabled}
                  onChange={(e) => handleSettingChange('alertsEnabled', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Live Monitoring</label>
                <input
                  type="checkbox"
                  checked={settings.realTimeMonitoring}
                  onChange={(e) => handleSettingChange('realTimeMonitoring', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Auto-block High Risk</label>
                <input
                  type="checkbox"
                  checked={settings.autoBlock}
                  onChange={(e) => handleSettingChange('autoBlock', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Retention Period (Days)
              </label>
              <select
                value={settings.dataRetention}
                onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={30}>30 Days</option>
                <option value={60}>60 Days</option>
                <option value={90}>90 Days</option>
                <option value={180}>180 Days</option>
                <option value={365}>1 Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance & Audit */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Compliance & Audit</h2>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">RBI Guidelines Compliance</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>✓ PCI DSS Level 1 Certified</li>
                <li>✓ Data localization in Indian servers</li>
                <li>✓ Transaction monitoring within required timeframes</li>
                <li>✓ Customer notification protocols implemented</li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Database className="h-4 w-4" />
                <span className="text-sm">Export Audit Log</span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Lock className="h-4 w-4" />
                <span className="text-sm">Security Report</span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="h-4 w-4" />
                <span className="text-sm">User Access Log</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}