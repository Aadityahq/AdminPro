import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

interface PieChartProps {
  data: any[];
  dataKey: string;
  nameKey: string;
  title?: string;
  colors?: string[];
}

const PieChart: React.FC<PieChartProps> = ({ 
  data, 
  dataKey, 
  nameKey, 
  title,
  colors 
}) => {
  const { theme, colorScheme } = useTheme();

  const getDefaultColors = () => {
    const colorSets = {
      blue: ['#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'],
      purple: ['#8B5CF6', '#A78BFA', '#C4B5FD', '#E9D5FF'],
      green: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0'],
      orange: ['#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A'],
      red: ['#EF4444', '#F87171', '#FCA5A5', '#FECACA'],
      pink: ['#EC4899', '#F472B6', '#F9A8D4', '#FBCFE8'],
      indigo: ['#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'],
      teal: ['#14B8A6', '#2DD4BF', '#5EEAD4', '#99F6E4']
    };
    return colorSets[colorScheme];
  };

  const chartColors = colors || getDefaultColors();

  return (
    <div className={`
      p-4 sm:p-6 rounded-xl border backdrop-blur-sm h-full flex flex-col
      ${theme === 'dark' 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white/50 border-gray-200'
      }
    `}>
      {title && (
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
      )}
      
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="80%"
              fill="#8884d8"
              dataKey={dataKey}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                border: `1px solid ${theme === 'dark' ? '#374151' : '#E5E7EB'}`,
                borderRadius: '8px',
                color: theme === 'dark' ? '#F9FAFB' : '#111827'
              }}
            />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;