import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Download,
  RefreshCw,
  Plus
} from 'lucide-react';
import StatCard from '../components/Common/StatCard';
import LineChart from '../components/Charts/LineChart';
import AreaChart from '../components/Charts/AreaChart';
import PieChart from '../components/Charts/PieChart';
import Card from '../components/Common/Card';
import Slider from '../components/Common/Slider';
import { useTheme } from '../contexts/ThemeContext';
import { useApp } from '../contexts/AppContext';
import { mockApi } from '../utils/mockApi';

const Dashboard: React.FC = () => {
  const { theme, colorScheme } = useTheme();
  const { addTask, addEvent, addNote } = useApp();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Dashboard controls
  const [chartHeight, setChartHeight] = useState(300);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [dataPoints, setDataPoints] = useState(6);

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

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAnalytics();
    setRefreshing(false);
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(analytics, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dashboard-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'addUser':
        alert('Add User functionality - would open user form');
        break;
      case 'createOrder':
        alert('Create Order functionality - would open order form');
        break;
      case 'generateReport':
        handleExportData();
        break;
      case 'systemSettings':
        alert('System Settings - would open settings panel');
        break;
      case 'addTask':
        addTask({
          title: 'New Dashboard Task',
          description: 'Task created from dashboard quick action',
          status: 'todo',
          priority: 'medium',
          assignee: 'John Doe',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        });
        alert('New task added successfully!');
        break;
      case 'addEvent':
        addEvent({
          title: 'Dashboard Meeting',
          description: 'Meeting scheduled from dashboard',
          date: new Date(),
          startTime: '10:00',
          endTime: '11:00',
          type: 'meeting',
          color: '#3B82F6'
        });
        alert('New event added successfully!');
        break;
      case 'addNote':
        addNote({
          title: 'Dashboard Note',
          content: 'Note created from dashboard quick action',
          tags: ['dashboard', 'quick-action']
        });
        alert('New note added successfully!');
        break;
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`
              animate-pulse rounded-xl h-32
              ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}
            `} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`
              animate-pulse rounded-xl h-80
              ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}
            `} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section with Controls */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-gray-500">Here's what's happening with your business today.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className={`
              px-4 py-2 rounded-lg bg-gradient-to-r ${getColorClasses()} text-white
              hover:opacity-90 transition-all duration-200 hover:scale-105
              flex items-center gap-2 disabled:opacity-50
            `}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          <button
            onClick={handleExportData}
            className={`
              px-4 py-2 rounded-lg border transition-colors
              ${theme === 'dark' 
                ? 'border-gray-700 hover:bg-gray-800' 
                : 'border-gray-300 hover:bg-gray-50'
              }
              flex items-center gap-2
            `}
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Dashboard Controls */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Dashboard Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Slider
            label="Chart Height"
            value={chartHeight}
            onChange={setChartHeight}
            min={200}
            max={500}
            step={50}
            unit="px"
          />
          
          <Slider
            label="Auto Refresh"
            value={refreshInterval}
            onChange={setRefreshInterval}
            min={10}
            max={120}
            step={10}
            unit="s"
          />
          
          <Slider
            label="Data Points"
            value={dataPoints}
            onChange={setDataPoints}
            min={3}
            max={12}
            step={1}
          />
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="5,423"
          change={12.5}
          icon={Users}
        />
        <StatCard
          title="Revenue"
          value="$54,239"
          change={-2.3}
          icon={DollarSign}
        />
        <StatCard
          title="Orders"
          value="1,234"
          change={8.7}
          icon={ShoppingCart}
        />
        <StatCard
          title="Growth"
          value="23.5%"
          change={15.2}
          icon={TrendingUp}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div style={{ height: chartHeight }}>
          <LineChart
            data={analytics?.revenue?.slice(0, dataPoints) || []}
            dataKey="value"
            xAxisKey="name"
            title="Revenue Trend"
          />
        </div>
        
        <div style={{ height: chartHeight }}>
          <AreaChart
            data={analytics?.revenue?.slice(0, dataPoints) || []}
            dataKey="value"
            xAxisKey="name"
            title="Revenue Growth"
          />
        </div>
        
        <div style={{ height: chartHeight }}>
          <PieChart
            data={analytics?.users || []}
            dataKey="value"
            nameKey="name"
            title="User Distribution"
          />
        </div>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <button
              onClick={() => handleQuickAction('addTask')}
              className={`
                p-2 rounded-lg bg-gradient-to-r ${getColorClasses()} text-white
                hover:opacity-90 transition-all duration-200 hover:scale-105
              `}
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { 
                icon: CheckCircle, 
                text: 'Order #1234 completed', 
                time: '2 minutes ago', 
                color: 'text-green-500',
                action: () => alert('View order details')
              },
              { 
                icon: Users, 
                text: 'New user registered', 
                time: '5 minutes ago', 
                color: 'text-blue-500',
                action: () => handleQuickAction('addUser')
              },
              { 
                icon: AlertCircle, 
                text: 'Low inventory alert', 
                time: '10 minutes ago', 
                color: 'text-orange-500',
                action: () => alert('Check inventory')
              },
              { 
                icon: Activity, 
                text: 'System backup completed', 
                time: '1 hour ago', 
                color: 'text-purple-500',
                action: () => alert('View backup details')
              },
              { 
                icon: Clock, 
                text: 'Scheduled maintenance', 
                time: '2 hours ago', 
                color: 'text-gray-500',
                action: () => handleQuickAction('systemSettings')
              }
            ].map((activity, index) => (
              <button
                key={index}
                onClick={activity.action}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <activity.icon className={`w-5 h-5 ${activity.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {[
            { label: 'Add User', icon: Users, color: 'bg-blue-500', action: 'addUser' },
            { label: 'Create Order', icon: ShoppingCart, color: 'bg-green-500', action: 'createOrder' },
            { label: 'Generate Report', icon: TrendingUp, color: 'bg-purple-500', action: 'generateReport' },
            { label: 'System Settings', icon: Settings, color: 'bg-orange-500', action: 'systemSettings' },
            { label: 'Add Task', icon: CheckCircle, color: 'bg-red-500', action: 'addTask' },
            { label: 'Schedule Event', icon: Clock, color: 'bg-pink-500', action: 'addEvent' },
            { label: 'Create Note', icon: Activity, color: 'bg-teal-500', action: 'addNote' }
          ].map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.action)}
              className={`
                ${action.color} text-white p-4 rounded-lg text-center
                hover:opacity-90 transition-all duration-200 hover:scale-105
                flex flex-col items-center gap-2
              `}
            >
              <action.icon size={24} />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">System Performance</h3>
          <div className="space-y-4">
            {[
              { label: 'CPU Usage', value: 45, max: 100, unit: '%', color: 'blue' },
              { label: 'Memory Usage', value: 68, max: 100, unit: '%', color: 'green' },
              { label: 'Disk Usage', value: 32, max: 100, unit: '%', color: 'orange' },
              { label: 'Network Load', value: 78, max: 100, unit: '%', color: 'purple' }
            ].map((metric, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <span className="text-sm text-gray-500">{metric.value}{metric.unit}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-${metric.color}-500 transition-all duration-500`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Goals</h3>
          <div className="space-y-6">
            {[
              { label: 'Monthly Target', current: 54239, target: 75000, color: 'blue' },
              { label: 'Quarterly Goal', current: 142000, target: 200000, color: 'green' },
              { label: 'Annual Objective', current: 480000, target: 800000, color: 'purple' }
            ].map((goal, index) => {
              const percentage = (goal.current / goal.target) * 100;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{goal.label}</span>
                    <span className="text-sm text-gray-500">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full bg-gradient-to-r from-${goal.color}-400 to-${goal.color}-600 transition-all duration-1000`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {percentage.toFixed(1)}% complete
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;