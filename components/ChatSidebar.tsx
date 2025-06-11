import React, { useState } from 'react';
import { Users, Hash, Settings, Search, Plus, Bell, BellOff } from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  unread?: number;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
}

interface ChatSidebarProps {
  activeChannel: string;
  onChannelSelect: (channelId: string) => void;
  onlineUsers: string[];
  currentUser: string;
  currentUserAvatar: string;
}

const channels: Channel[] = [
  { id: '1', name: 'general', type: 'text', unread: 2 },
  { id: '2', name: 'random', type: 'text' },
  { id: '3', name: 'development', type: 'text', unread: 1 },
  { id: '4', name: 'design', type: 'text' },
];

const users: User[] = [
  { id: '1', name: 'Shivam Shekhawat', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face', status: 'online' },
  { id: '2', name: 'Shivam', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face', status: 'online' },
  { id: '3', name: 'Ravi', avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face', status: 'away' },
  { id: '4', name: 'Paras', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face', status: 'offline' },
];

export default function ChatSidebar({ activeChannel, onChannelSelect, onlineUsers, currentUser, currentUserAvatar }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getUserStatus = (userName: string) => {
    if (userName === currentUser) return 'online';
    return onlineUsers.includes(userName) ? 'online' : 'offline';
  };

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            ChatSpace
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setNotifications(!notifications)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
            >
              {notifications ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
            </button>
            <Settings className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search channels & users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Channels</h3>
            <Plus className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer transition-colors" />
          </div>
          <div className="space-y-1">
            {filteredChannels.map((channel) => (
              <div
                key={channel.id}
                onClick={() => onChannelSelect(channel.id)}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                  activeChannel === channel.id
                    ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30'
                    : 'hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-200 font-medium">{channel.name}</span>
                </div>
                {channel.unread && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center animate-pulse">
                    {channel.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Users */}
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Team Members</h3>
            <span className="text-xs text-slate-400">{onlineUsers.length + 1}</span>
          </div>
          <div className="space-y-2">
            {filteredUsers.map((user) => {
              const status = getUserStatus(user.name);
              return (
                <div key={user.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-all group">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(status)} rounded-full border-2 border-slate-900`} />
                  </div>
                  <div className="flex-1">
                    <span className="text-slate-200 font-medium text-sm group-hover:text-white transition-colors">
                      {user.name}
                    </span>
                    <div className="text-xs text-slate-400 capitalize">{status}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current User Profile */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center space-x-3 p-2 rounded-lg bg-slate-800/50">
          <div className="relative">
            <img
              src={currentUserAvatar}
              alt={currentUser}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-white">{currentUser}</div>
            <div className="text-xs text-slate-400">Online</div>
          </div>
        </div>
      </div>
    </div>
  );
}