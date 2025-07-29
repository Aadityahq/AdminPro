import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Table,
  Calendar,
  Kanban,
  Users,
  Settings,
  StickyNote,
  CheckSquare,
  PieChart,
  Menu,
  MessageSquare,
  FolderOpen,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { theme, colorScheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/tables', icon: Table, label: 'Tables' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/kanban', icon: Kanban, label: 'Kanban' },
    { path: '/users', icon: Users, label: 'Users' },
    { path: '/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/files', icon: FolderOpen, label: 'File Manager' },
    { path: '/notes', icon: StickyNote, label: 'Notes' },
    { path: '/todos', icon: CheckSquare, label: 'Todos' },
    { path: '/reports', icon: PieChart, label: 'Reports' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  const getColorClasses = () => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
      pink: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700',
      indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
      teal: 'from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
    };
    return colors[colorScheme];
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full z-50 transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${theme === 'dark' 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-white border-gray-200'
        }
        border-r backdrop-blur-sm
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          {!isCollapsed && (
            <h1 className={`text-xl font-bold bg-gradient-to-r ${getColorClasses()} bg-clip-text text-transparent`}>
              Admin Pro
            </h1>
          )}
          
          <div className="flex items-center gap-2">
            {/* Collapse Toggle (Desktop) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
            
            {/* Mobile Close */}
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isCollapsed ? 'justify-center' : ''}
                ${isActive 
                  ? `bg-gradient-to-r ${getColorClasses()} text-white shadow-lg transform scale-105`
                  : `hover:bg-gray-100 dark:hover:bg-gray-800 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`
                }
              `}
              onClick={() => window.innerWidth < 1024 && onToggle()}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        {!isCollapsed && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className={`
              p-4 rounded-lg border
              ${theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-gray-50 border-gray-200'
              }
            `}>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-sm">John Doe</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed User Avatar */}
        {isCollapsed && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600"
              title="John Doe - Administrator"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;