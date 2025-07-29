import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  const { theme } = useTheme();

  return (
    <div className={`
      rounded-xl border backdrop-blur-sm transition-all duration-200
      ${theme === 'dark' 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white/50 border-gray-200'
      }
      ${hover ? 'hover:shadow-lg hover:scale-[1.02]' : ''}
      w-full overflow-hidden
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;