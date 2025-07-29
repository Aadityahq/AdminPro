import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  unit?: string;
  className?: string;
}

const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  unit = '',
  className = ''
}) => {
  const { theme, colorScheme } = useTheme();

  const getColorClasses = () => {
    const colors = {
      blue: 'accent-blue-500',
      purple: 'accent-purple-500',
      green: 'accent-green-500',
      orange: 'accent-orange-500',
      red: 'accent-red-500',
      pink: 'accent-pink-500',
      indigo: 'accent-indigo-500',
      teal: 'accent-teal-500'
    };
    return colors[colorScheme];
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">{label}</label>
          <span className="text-sm text-gray-500">
            {value}{unit}
          </span>
        </div>
      )}
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`
            w-full h-2 rounded-lg appearance-none cursor-pointer
            ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}
            ${getColorClasses()}
          `}
          style={{
            background: `linear-gradient(to right, 
              ${colorScheme === 'blue' ? '#3B82F6' : 
                colorScheme === 'purple' ? '#8B5CF6' :
                colorScheme === 'green' ? '#10B981' :
                colorScheme === 'orange' ? '#F59E0B' :
                colorScheme === 'red' ? '#EF4444' :
                colorScheme === 'pink' ? '#EC4899' :
                colorScheme === 'indigo' ? '#6366F1' :
                '#14B8A6'
              } 0%, 
              ${colorScheme === 'blue' ? '#3B82F6' : 
                colorScheme === 'purple' ? '#8B5CF6' :
                colorScheme === 'green' ? '#10B981' :
                colorScheme === 'orange' ? '#F59E0B' :
                colorScheme === 'red' ? '#EF4444' :
                colorScheme === 'pink' ? '#EC4899' :
                colorScheme === 'indigo' ? '#6366F1' :
                '#14B8A6'
              } ${percentage}%, 
              ${theme === 'dark' ? '#374151' : '#E5E7EB'} ${percentage}%, 
              ${theme === 'dark' ? '#374151' : '#E5E7EB'} 100%)`
          }}
        />
        
        {/* Custom thumb styling */}
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: ${colorScheme === 'blue' ? '#3B82F6' : 
              colorScheme === 'purple' ? '#8B5CF6' :
              colorScheme === 'green' ? '#10B981' :
              colorScheme === 'orange' ? '#F59E0B' :
              colorScheme === 'red' ? '#EF4444' :
              colorScheme === 'pink' ? '#EC4899' :
              colorScheme === 'indigo' ? '#6366F1' :
              '#14B8A6'
            };
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            transition: transform 0.2s ease;
          }
          
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
          }
          
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: ${colorScheme === 'blue' ? '#3B82F6' : 
              colorScheme === 'purple' ? '#8B5CF6' :
              colorScheme === 'green' ? '#10B981' :
              colorScheme === 'orange' ? '#F59E0B' :
              colorScheme === 'red' ? '#EF4444' :
              colorScheme === 'pink' ? '#EC4899' :
              colorScheme === 'indigo' ? '#6366F1' :
              '#14B8A6'
            };
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            transition: transform 0.2s ease;
          }
          
          input[type="range"]::-moz-range-thumb:hover {
            transform: scale(1.1);
          }
        `}</style>
      </div>
    </div>
  );
};

export default Slider;