import React, { useState } from 'react';
import { Search, Bell, Settings, Moon, Sun, Menu, User, LogOut, HelpCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const { theme, toggleTheme, colorScheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setSearchQuery('');
    }
  };

  const notifications = [
    { id: 1, title: 'New user registered', time: '2 min ago', type: 'user' },
    { id: 2, title: 'Order completed', time: '5 min ago', type: 'order' },
    { id: 3, title: 'System backup finished', time: '1 hour ago', type: 'system' }
  ];

  return (
    <header className={`
      sticky top-0 z-30 backdrop-blur-sm border-b
      ${theme === 'dark' 
        ? 'bg-gray-900/80 border-gray-700' 
        : 'bg-white/80 border-gray-200'
      }
    `}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSidebarToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu size={20} />
          </button>
          
          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`
                pl-10 pr-4 py-2 w-64 rounded-lg border transition-colors
                ${theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                }
                focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500 focus:border-transparent
              `}
            />
          </form>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`
              p-2 rounded-lg transition-all duration-200 hover:scale-105
              ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
            `}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`
                p-2 rounded-lg transition-all duration-200 hover:scale-105 relative
                ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
              `}
              title="Notifications"
            >
              <Bell size={20} />
              <span className={`
                absolute -top-1 -right-1 w-3 h-3 rounded-full text-xs
                bg-gradient-to-r ${getColorClasses()}
              `} />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className={`
                absolute right-0 mt-2 w-80 rounded-lg border shadow-lg z-50
                ${theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
                }
              `}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map(notification => (
                    <button
                      key={notification.id}
                      onClick={() => {
                        alert(`Notification: ${notification.title}`);
                        setShowNotifications(false);
                      }}
                      className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </button>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <button 
                    onClick={() => {
                      alert('View all notifications');
                      setShowNotifications(false);
                    }}
                    className="w-full text-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button 
            onClick={() => alert('Settings panel would open')}
            className={`
              p-2 rounded-lg transition-all duration-200 hover:scale-105
              ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
            `}
            title="Settings"
          >
            <Settings size={20} />
          </button>

          {/* Help */}
          <button 
            onClick={() => alert('Help center would open')}
            className={`
              p-2 rounded-lg transition-all duration-200 hover:scale-105
              ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
            `}
            title="Help"
          >
            <HelpCircle size={20} />
          </button>

          {/* User profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 ml-4 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-transparent hover:border-gray-300 transition-colors"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <div className={`
                absolute right-0 mt-2 w-48 rounded-lg border shadow-lg z-50
                ${theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
                }
              `}>
                <div className="p-2">
                  <button
                    onClick={() => {
                      alert('Profile page would open');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <User size={16} />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      alert('Settings page would open');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Settings size={16} />
                    Settings
                  </button>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to logout?')) {
                        alert('Logout functionality would be implemented');
                      }
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 text-left rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showUserMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;