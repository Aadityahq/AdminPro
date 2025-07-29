import React from 'react';
import { Palette, Monitor, Moon, Sun, Bell, Shield, User, Database } from 'lucide-react';
import Card from '../components/Common/Card';
import { useTheme } from '../contexts/ThemeContext';
import { ColorScheme } from '../types';

const Settings: React.FC = () => {
  const { theme, colorScheme, setTheme, setColorScheme } = useTheme();

  const colorSchemes: { name: string; value: ColorScheme; color: string }[] = [
    { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
    { name: 'Purple', value: 'purple', color: 'bg-purple-500' },
    { name: 'Green', value: 'green', color: 'bg-green-500' },
    { name: 'Orange', value: 'orange', color: 'bg-orange-500' },
    { name: 'Red', value: 'red', color: 'bg-red-500' },
    { name: 'Pink', value: 'pink', color: 'bg-pink-500' },
    { name: 'Indigo', value: 'indigo', color: 'bg-indigo-500' },
    { name: 'Teal', value: 'teal', color: 'bg-teal-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-500">Customize your dashboard experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Appearance</h3>
          </div>

          <div className="space-y-6">
            {/* Theme Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">Theme</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`
                    flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all
                    ${theme === 'light' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                    }
                  `}
                >
                  <Sun size={18} />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`
                    flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all
                    ${theme === 'dark' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                    }
                  `}
                >
                  <Moon size={18} />
                  <span>Dark</span>
                </button>
              </div>
            </div>

            {/* Color Scheme Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">Color Scheme</label>
              <div className="grid grid-cols-4 gap-3">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.value}
                    onClick={() => setColorScheme(scheme.value)}
                    className={`
                      flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all
                      ${colorScheme === scheme.value 
                        ? 'border-gray-800 dark:border-gray-200' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                      }
                    `}
                  >
                    <div className={`w-6 h-6 rounded-full ${scheme.color}`} />
                    <span className="text-xs font-medium">{scheme.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Account</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className={`
                  w-full px-3 py-2 rounded-lg border transition-colors
                  ${theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                `}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                defaultValue="john@example.com"
                className={`
                  w-full px-3 py-2 rounded-lg border transition-colors
                  ${theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                `}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                defaultValue="admin"
                className={`
                  w-full px-3 py-2 rounded-lg border transition-colors
                  ${theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                `}
              >
                <option value="admin">Administrator</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Email notifications', desc: 'Receive notifications via email' },
              { label: 'Push notifications', desc: 'Receive push notifications in browser' },
              { label: 'Task reminders', desc: 'Get reminded about upcoming tasks' },
              { label: 'Weekly reports', desc: 'Receive weekly performance reports' },
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{setting.label}</p>
                  <p className="text-sm text-gray-500">{setting.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Security</h3>
          </div>

          <div className="space-y-4">
            <button className="w-full px-4 py-2 text-left rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Change Password
            </button>
            <button className="w-full px-4 py-2 text-left rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Enable Two-Factor Authentication
            </button>
            <button className="w-full px-4 py-2 text-left rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              View Login Activity
            </button>
            <button className="w-full px-4 py-2 text-left rounded-lg border border-red-300 dark:border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              Delete Account
            </button>
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className={`
          px-6 py-2 rounded-lg bg-gradient-to-r 
          ${colorScheme === 'blue' ? 'from-blue-500 to-blue-600' : 
            colorScheme === 'purple' ? 'from-purple-500 to-purple-600' :
            colorScheme === 'green' ? 'from-green-500 to-green-600' :
            colorScheme === 'orange' ? 'from-orange-500 to-orange-600' :
            colorScheme === 'red' ? 'from-red-500 to-red-600' :
            colorScheme === 'pink' ? 'from-pink-500 to-pink-600' :
            colorScheme === 'indigo' ? 'from-indigo-500 to-indigo-600' :
            'from-teal-500 to-teal-600'
          }
          text-white hover:opacity-90 transition-all duration-200 hover:scale-105
        `}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;