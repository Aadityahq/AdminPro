import React, { useState, useEffect } from 'react';
import { Download, Filter, Calendar, TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react';
import Card from '../components/Common/Card';
import LineChart from '../components/Charts/LineChart';
import BarChart from '../components/Charts/BarChart';
import PieChart from '../components/Charts/PieChart';
import StatCard from '../components/Common/StatCard';
import { useTheme } from '../contexts/ThemeContext';
import { mockApi } from '../utils/mockApi';

const Reports: React.FC = () => {
  const { theme, colorScheme } = useTheme();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30d');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading reports:', error);
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-gray-500">Comprehensive business intelligence and reporting</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className={`
              px-4 py-2 rounded-lg border transition-colors
              ${theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }
              focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500
            `}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <button className={`
            px-4 py-2 rounded-lg bg-gradient-to-r ${getColorClasses()} text-white
            hover:opacity-90 transition-all duration-200 hover:scale-105
            flex items-center gap-2
          `}>
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$284,590"
          change={18.2}
          icon={DollarSign}
        />
        <StatCard
          title="Active Users"
          value="12,847"
          change={-3.1}
          icon={Users}
        />
        <StatCard
          title="Orders"
          value="3,429"
          change={24.7}
          icon={ShoppingCart}
        />
        <StatCard
          title="Growth Rate"
          value="15.3%"
          change={5.8}
          icon={TrendingUp}
        />
      </div>

      {/* Revenue Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          data={analytics?.revenue || []}
          dataKey="value"
          xAxisKey="name"
          title="Revenue Trend Analysis"
        />
        
        <BarChart
          data={analytics?.revenue || []}
          dataKey="value"
          xAxisKey="name"
          title="Monthly Revenue Comparison"
        />
      </div>

      {/* User Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PieChart
          data={analytics?.users || []}
          dataKey="value"
          nameKey="name"
          title="User Segmentation"
        />
        
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-6">
            {[
              { metric: 'Conversion Rate', value: '3.24%', change: '+0.12%', color: 'text-green-500' },
              { metric: 'Average Order Value', value: '$127.50', change: '+$8.20', color: 'text-green-500' },
              { metric: 'Customer Acquisition Cost', value: '$45.30', change: '-$2.10', color: 'text-green-500' },
              { metric: 'Customer Lifetime Value', value: '$890.40', change: '+$67.20', color: 'text-green-500' },
              { metric: 'Bounce Rate', value: '32.1%', change: '-1.8%', color: 'text-green-500' },
              { metric: 'Page Load Time', value: '2.3s', change: '-0.2s', color: 'text-green-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div>
                  <p className="font-medium">{item.metric}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
                <div className={`text-right ${item.color}`}>
                  <p className="text-sm font-medium">{item.change}</p>
                  <p className="text-xs">vs last period</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <div className="space-y-4">
            {[
              { name: 'Premium Dashboard Pro', sales: 1247, revenue: '$62,350', growth: '+15%' },
              { name: 'Analytics Suite', sales: 892, revenue: '$44,600', growth: '+8%' },
              { name: 'Mobile App Builder', sales: 634, revenue: '$31,700', growth: '+22%' },
              { name: 'E-commerce Template', sales: 445, revenue: '$22,250', growth: '-3%' },
              { name: 'Admin Panel Kit', sales: 289, revenue: '$14,450', growth: '+12%' }
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{product.revenue}</p>
                  <p className={`text-sm ${product.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {product.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Regional Performance</h3>
          <div className="space-y-4">
            {[
              { region: 'North America', revenue: '$142,350', percentage: 45.2, growth: '+12%' },
              { region: 'Europe', revenue: '$89,240', percentage: 28.4, growth: '+8%' },
              { region: 'Asia Pacific', revenue: '$56,780', percentage: 18.1, growth: '+25%' },
              { region: 'Latin America', revenue: '$18,920', percentage: 6.0, growth: '+15%' },
              { region: 'Others', revenue: '$7,300', percentage: 2.3, growth: '+5%' }
            ].map((region, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{region.region}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{region.revenue}</span>
                    <span className="text-sm text-green-500">{region.growth}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${getColorClasses()}`}
                    style={{ width: `${region.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500">{region.percentage}% of total</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Export Options</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { format: 'PDF Report', desc: 'Complete analytics report', icon: '📄' },
            { format: 'Excel Data', desc: 'Raw data export', icon: '📊' },
            { format: 'CSV Export', desc: 'Comma-separated values', icon: '📋' },
            { format: 'JSON API', desc: 'Developer-friendly format', icon: '🔧' }
          ].map((option, index) => (
            <button
              key={index}
              className={`
                p-4 rounded-lg border border-gray-300 dark:border-gray-600
                hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                text-left
              `}
            >
              <div className="text-2xl mb-2">{option.icon}</div>
              <p className="font-medium">{option.format}</p>
              <p className="text-sm text-gray-500">{option.desc}</p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Reports;