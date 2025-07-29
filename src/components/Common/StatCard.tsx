import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Card from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color }) => {
  const { theme, colorScheme } = useTheme();

  const getColorClasses = () => {
    if (color) return color;
    
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

  return (
    <Card hover className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`
          p-3 rounded-lg bg-gradient-to-r ${getColorClasses()}
        `}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change !== undefined && (
          <div className={`
            text-sm font-medium
            ${change >= 0 ? 'text-green-500' : 'text-red-500'}
          `}>
            {change >= 0 ? '+' : ''}{change}%
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-1">{value}</h3>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </Card>
  );
};

export default StatCard;