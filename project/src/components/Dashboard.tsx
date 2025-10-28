import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, TrendingUp, Clock, Shield, MapPin } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { LiveTransactions } from './LiveTransactions';
import { ThreatMap } from './ThreatMap';

export function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalTransactions: 0,
    fraudDetected: 0,
    falsePositives: 0,
    avgResponseTime: 0,
  });

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 5) + 1,
        fraudDetected: prev.fraudDetected + (Math.random() > 0.98 ? 1 : 0),
        falsePositives: prev.falsePositives + (Math.random() > 0.995 ? 1 : 0),
        avgResponseTime: 1.2 + Math.random() * 0.6,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fraudRate = metrics.totalTransactions > 0 ? (metrics.fraudDetected / metrics.totalTransactions) * 100 : 0;
  const accuracy = metrics.totalTransactions > 0 ? ((metrics.totalTransactions - metrics.falsePositives) / metrics.totalTransactions) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-600" />
          <span className="text-green-800 font-medium">System Status: Active</span>
          <span className="text-green-600">• RBI Compliance: Verified • Last Update: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Transactions Today"
          value={metrics.totalTransactions.toLocaleString()}
          change="+12.3%"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Fraud Detected"
          value={metrics.fraudDetected.toString()}
          subtitle={`${fraudRate.toFixed(2)}% of total`}
          changeType="neutral"
          icon={AlertTriangle}
        />
        <MetricCard
          title="System Accuracy"
          value={`${accuracy.toFixed(1)}%`}
          change="+0.3%"
          changeType="positive"
          icon={CheckCircle}
        />
        <MetricCard
          title="Avg Response Time"
          value={`${metrics.avgResponseTime.toFixed(1)}s`}
          subtitle="Target: <2.0s"
          changeType={metrics.avgResponseTime < 2 ? "positive" : "negative"}
          icon={Clock}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Transactions Feed */}
        <div className="lg:col-span-2">
          <LiveTransactions />
        </div>

        {/* Threat Map */}
        <div>
          <ThreatMap />
        </div>
      </div>
    </div>
  );
}