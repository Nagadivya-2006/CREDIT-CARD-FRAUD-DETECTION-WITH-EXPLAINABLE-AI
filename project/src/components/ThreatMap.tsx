import React from 'react';
import { MapPin, AlertTriangle, TrendingUp } from 'lucide-react';

export function ThreatMap() {
  const threatLocations = [
    { city: 'Mumbai', threats: 12, change: '+3' },
    { city: 'Delhi', threats: 8, change: '+1' },
    { city: 'Bangalore', threats: 6, change: '-2' },
    { city: 'Chennai', threats: 4, change: '0' },
    { city: 'Hyderabad', threats: 3, change: '+1' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Threat Intelligence</h2>
        <p className="text-sm text-gray-600">Regional fraud activity (Last 24h)</p>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {threatLocations.map((location, index) => (
            <div key={location.city} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  index === 0 ? 'bg-red-100' : 
                  index === 1 ? 'bg-orange-100' : 'bg-gray-100'
                }`}>
                  <MapPin className={`h-4 w-4 ${
                    index === 0 ? 'text-red-600' : 
                    index === 1 ? 'text-orange-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{location.city}</p>
                  <p className="text-sm text-gray-600">{location.threats} active threats</p>
                </div>
              </div>
              
              <div className="text-right">
                <span className={`text-sm font-medium ${
                  location.change.startsWith('+') ? 'text-red-600' : 
                  location.change.startsWith('-') ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {location.change !== '0' && location.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Trending Pattern</span>
          </div>
          <p className="text-sm text-blue-800 mt-1">
            Unusual surge in high-value e-commerce transactions from new locations detected in Mumbai region.
          </p>
        </div>
      </div>
    </div>
  );
}