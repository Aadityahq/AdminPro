import React, { useState } from 'react';
import { Send, Search, Plus, Paperclip, Smile, MoreVertical } from 'lucide-react';
import Card from '../components/Common/Card';
import { useTheme } from '../contexts/ThemeContext';
import { format } from 'date-fns';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
  avatar: string;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  avatar: string;
  online: boolean;
}

const Messages: React.FC = () => {
  const { theme, colorScheme } = useTheme();
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Sarah Wilson',
      lastMessage: 'The design mockups look great!',
      timestamp: new Date('2024-01-15T14:30:00'),
      unread: 2,
      avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      online: true
    },
    {
      id: '2',
      name: 'Mike Johnson',
      lastMessage: 'Can we schedule a code review?',
      timestamp: new Date('2024-01-15T12:15:00'),
      unread: 0,
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      online: false
    },
    {
      id: '3',
      name: 'Jane Smith',
      lastMessage: 'Project timeline updated',
      timestamp: new Date('2024-01-15T10:45:00'),
      unread: 1,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      online: true
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Sarah Wilson',
      content: 'Hey! I wanted to discuss the new dashboard design.',
      timestamp: new Date('2024-01-15T14:00:00'),
      isOwn: false,
      avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '2',
      sender: 'You',
      content: 'Sure! What specific aspects would you like to review?',
      timestamp: new Date('2024-01-15T14:05:00'),
      isOwn: true,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '3',
      sender: 'Sarah Wilson',
      content: 'The color scheme and layout for the analytics section. I think we can make it more intuitive.',
      timestamp: new Date('2024-01-15T14:10:00'),
      isOwn: false,
      avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '4',
      sender: 'You',
      content: 'Great point! I agree the analytics section could use some improvements. Should we set up a meeting to go through the mockups?',
      timestamp: new Date('2024-01-15T14:15:00'),
      isOwn: true,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '5',
      sender: 'Sarah Wilson',
      content: 'The design mockups look great!',
      timestamp: new Date('2024-01-15T14:30:00'),
      isOwn: false,
      avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

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

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      alert(`Message sent: ${newMessage}`);
      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-gray-500">Stay connected with your team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Conversations</h3>
            <button className={`
              p-2 rounded-lg bg-gradient-to-r ${getColorClasses()} text-white
              hover:opacity-90 transition-all duration-200 hover:scale-105
            `}>
              <Plus size={16} />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`
                w-full pl-9 pr-3 py-2 rounded-lg border transition-colors text-sm
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                }
                focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500 focus:border-transparent
              `}
            />
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredConversations.map(conversation => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`
                  w-full p-3 rounded-lg text-left transition-colors
                  ${selectedConversation === conversation.id 
                    ? `bg-gradient-to-r ${getColorClasses()} text-white` 
                    : `hover:bg-gray-100 dark:hover:bg-gray-700`
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-10 h-10 rounded-full"
                    />
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{conversation.name}</p>
                      {conversation.unread > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs opacity-75 truncate">{conversation.lastMessage}</p>
                    <p className="text-xs opacity-50">{format(conversation.timestamp, 'HH:mm')}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-3 flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={selectedConv.avatar}
                        alt={selectedConv.name}
                        className="w-10 h-10 rounded-full"
                      />
                      {selectedConv.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedConv.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedConv.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}
                  >
                    <img
                      src={message.avatar}
                      alt={message.sender}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'text-right' : ''}`}>
                      <div
                        className={`
                          p-3 rounded-lg
                          ${message.isOwn 
                            ? `bg-gradient-to-r ${getColorClasses()} text-white` 
                            : `${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`
                          }
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(message.timestamp, 'HH:mm')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Paperclip size={20} />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className={`
                        w-full px-4 py-2 pr-12 rounded-lg border transition-colors
                        ${theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                        }
                        focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500 focus:border-transparent
                      `}
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                      <Smile size={16} />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className={`
                      p-2 rounded-lg bg-gradient-to-r ${getColorClasses()} text-white
                      hover:opacity-90 transition-all duration-200 hover:scale-105
                    `}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;