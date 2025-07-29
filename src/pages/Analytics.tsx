import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieChartIcon, 
  Activity,
  Download,
  RefreshCw
} from 'lucide-react';
import LineChart from '../components/Charts/LineChart';
import AreaChart from '../components/Charts/AreaChart';
import BarChart from '../components/Charts/BarChart';
import PieChart from '../components/Charts/PieChart';
import StatCard from '../components/Common/StatCard';
import Card from '../components/Common/Card';
import { useTheme } from '../contexts/ThemeContext';
import { mockApi } from '../utils/mockApi';

const Analytics: React.FC = () => {
  const { theme, colorScheme } = useTheme();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('6m');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getColorClasses = () => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      green: 'from-green-500 to-green-600',
      orange: 'from-orange-500 to-orange-600',
      red: 'from-red-500 to-red-600',
      pink: 'from-pink-500 to-pink-600',
      indigo: 'from-indigo-500 to-indigo-600',
      teal: 'from-teal-500 to-teal-600'
    };
    return colors[colorScheme];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-gray-500">Comprehensive insights into your business performance</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`
              px-4 py-2 rounded-lg border transition-colors
              ${theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }
              focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500
            `}
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
          
          <button
            onClick={loadAnalytics}
            className={`
              px-4 py-2 rounded-lg bg-gradient-to-r ${getColorClasses()} text-white
              hover:opacity-90 transition-all duration-200 hover:scale-105
              flex items-center gap-2
            `}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
          
          <button className={`
            px-4 py-2 rounded-lg border transition-colors
            ${theme === 'dark' 
              ? 'border-gray-700 hover:bg-gray-800' 
              : 'border-gray-300 hover:bg-gray-50'
            }
            flex items-center gap-2
          `}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$127,450"
          change={23.5}
          icon={TrendingUp}
        />
        <StatCard
          title="Active Users"
          value="8,549"
          change={12.3}
          icon={Activity}
        />
        <StatCard
          title="Conversion Rate"
          value="3.2%"
          change={-0.5}
          icon={BarChart3}
        />
        <StatCard
          title="Average Order"
          value="$89.50"
          change={8.7}
          icon={PieChartIcon}
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          data={analytics?.revenue || []}
          dataKey="value"
          xAxisKey="name"
          title="Revenue Over Time"
        />
        
        <AreaChart
          data={analytics?.revenue || []}
          dataKey="value"
          xAxisKey="name"
          title="Cumulative Growth"
        />
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BarChart
          data={analytics?.revenue || []}
          dataKey="value"
          xAxisKey="name"
          title="Monthly Comparison"
        />
        
        <PieChart
          data={analytics?.users || []}
          dataKey="value"
          nameKey="name"
          title="User Segments"
        />
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            {analytics?.performance?.map((metric: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium">{metric.name}</span>
                <span className={`
                  text-sm font-bold
                  ${metric.value < 100 ? 'text-green-500' : 
                    metric.value < 200 ? 'text-yellow-500' : 'text-red-500'}
                `}>
                  {metric.value}{metric.name.includes('Time') ? 'ms' : ''}
                </span>
              </div>
            )) || []}
          </div>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Performing Pages</h3>
          <div className="space-y-3">
            {[
              { page: '/dashboard', views: 12450, change: 15.3 },
              { page: '/products', views: 8920, change: 8.7 },
              { page: '/analytics', views: 5670, change: -2.1 },
              { page: '/users', views: 4320, change: 12.8 },
              { page: '/settings', views: 2180, change: 5.4 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div>
                  <p className="font-medium">{item.page}</p>
                  <p className="text-sm text-gray-500">{item.views.toLocaleString()} views</p>
                </div>
                <div className={`
                  text-sm font-medium
                  ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}
                `}>
                  {item.change >= 0 ? '+' : ''}{item.change}%
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
          <div className="space-y-3">
            {[
              { source: 'Direct', visitors: 4820, percentage: 35.2 },
              { source: 'Google Search', visitors: 3450, percentage: 25.1 },
              { source: 'Social Media', visitors: 2890, percentage: 21.0 },
              { source: 'Email Marketing', visitors: 1560, percentage: 11.4 },
              { source: 'Referrals', visitors: 1020, percentage: 7.3 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">{item.source}</p>
                    <span className="text-sm text-gray-500">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getColorClasses()}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;