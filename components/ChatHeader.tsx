import React from 'react';
import { Hash, Users, Phone, Video, Info, Search, Bell } from 'lucide-react';

interface ChatHeaderProps {
  channelName: string;
  memberCount: number;
  unreadCount: number;
  onVoiceCall: () => void;
  onVideoCall: () => void;
}

export default function ChatHeader({ channelName, memberCount, unreadCount, onVoiceCall, onVideoCall }: ChatHeaderProps) {
  return (
    <div className="h-16 bg-white/10 backdrop-blur-lg border-b border-slate-200/10 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Hash className="w-6 h-6 text-slate-400" />
          <h2 className="text-xl font-bold text-white">{channelName}</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="h-6 w-px bg-slate-600" />
        <div className="flex items-center space-x-2 text-slate-400">
          <Users className="w-4 h-4" />
          <span className="text-sm">{memberCount} members</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={onVoiceCall}
            className="p-2 text-slate-400 hover:text-green-400 hover:bg-slate-800/50 rounded-lg transition-all group"
            title="Start voice call"
          >
            <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={onVideoCall}
            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-all group"
            title="Start video call"
          >
            <Video className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
        <div className="h-6 w-px bg-slate-600" />
        <div className="flex items-center space-x-2">
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all relative">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
            )}
          </button>
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}