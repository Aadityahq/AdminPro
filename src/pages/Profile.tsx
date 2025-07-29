import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import Card from '../components/Common/Card';
import { useTheme } from '../contexts/ThemeContext';
import { format } from 'date-fns';

const Profile: React.FC = () => {
  const { theme, colorScheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Experienced administrator with a passion for efficient systems and team leadership.',
    joinDate: new Date('2022-01-15'),
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
  });

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

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-gray-500">Manage your personal information and preferences</p>
        </div>
        
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`
            px-4 py-2 rounded-lg bg-gradient-to-r ${getColorClasses()} text-white
            hover:opacity-90 transition-all duration-200 hover:scale-105
            flex items-center gap-2
          `}
        >
          {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="p-6 text-center">
          <div className="relative inline-block mb-4">
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg"
            />
            {isEditing && (
              <button className={`
                absolute bottom-0 right-0 p-2 rounded-full bg-gradient-to-r ${getColorClasses()} text-white
                hover:opacity-90 transition-all duration-200 hover:scale-105
              `}>
                <Edit2 size={16} />
              </button>
            )}
          </div>
          
          <h2 className="text-xl font-bold mb-2">{profile.name}</h2>
          <p className="text-gray-500 mb-4">Administrator</p>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-center gap-2">
              <Mail size={16} className="text-gray-400" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Phone size={16} className="text-gray-400" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin size={16} className="text-gray-400" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <span>Joined {format(profile.joinDate, 'MMM yyyy')}</span>
            </div>
          </div>
        </Card>

        {/* Profile Details */}
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold mb-6">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className={`
                    w-full px-3 py-2 rounded-lg border transition-colors
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                    }
                    focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500
                  `}
                />
              ) : (
                <p className="py-2">{profile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className={`
                    w-full px-3 py-2 rounded-lg border transition-colors
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                    }
                    focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500
                  `}
                />
              ) : (
                <p className="py-2">{profile.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className={`
                    w-full px-3 py-2 rounded-lg border transition-colors
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                    }
                    focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500
                  `}
                />
              ) : (
                <p className="py-2">{profile.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className={`
                    w-full px-3 py-2 rounded-lg border transition-colors
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                    }
                    focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500
                  `}
                />
              ) : (
                <p className="py-2">{profile.location}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  className={`
                    w-full px-3 py-2 rounded-lg border transition-colors resize-none
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                    }
                    focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500
                  `}
                />
              ) : (
                <p className="py-2">{profile.bio}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors flex items-center gap-2"
              >
                <X size={16} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={`
                  px-4 py-2 rounded-lg bg-gradient-to-r ${getColorClasses()} text-white
                  hover:opacity-90 transition-all duration-200 hover:scale-105
                  flex items-center gap-2
                `}
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          )}
        </Card>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold mb-4">Recent Activity</h4>
          <div className="space-y-3">
            {[
              { action: 'Updated user permissions', time: '2 hours ago' },
              { action: 'Generated monthly report', time: '1 day ago' },
              { action: 'Modified system settings', time: '3 days ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span>{activity.action}</span>
                <span className="text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold mb-4">Statistics</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Tasks Completed</span>
              <span className="font-bold">127</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Projects Managed</span>
              <span className="font-bold">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Team Members</span>
              <span className="font-bold">15</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold mb-4">Achievements</h4>
          <div className="space-y-3">
            {[
              { title: 'Team Leader', desc: 'Led 5+ successful projects' },
              { title: 'Efficiency Expert', desc: 'Improved workflow by 40%' },
              { title: 'Problem Solver', desc: 'Resolved 100+ tickets' }
            ].map((achievement, index) => (
              <div key={index} className="text-sm">
                <p className="font-medium">{achievement.title}</p>
                <p className="text-gray-500">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;