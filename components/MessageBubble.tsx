import React, { useState } from 'react';
import { Heart, MessageSquare, Share, MoreHorizontal, Check, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  reactions?: { emoji: string; count: number; users: string[] }[];
  replies?: number;
  isRead?: boolean;
}

interface MessageBubbleProps {
  message: Message;
  isOwn?: boolean;
  onReaction: (messageId: string, emoji: string) => void;
}

const quickReactions = ['❤️', '👍', '😂', '😮', '😢', '🔥'];

export default function MessageBubble({ message, isOwn = false, onReaction }: MessageBubbleProps) {
  const [showActions, setShowActions] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleQuickReaction = (emoji: string) => {
    onReaction(message.id, emoji);
    setShowReactionPicker(false);
  };

  return (
    <div
      className={`group flex items-start space-x-3 p-4 hover:bg-slate-800/20 transition-all ${
        isOwn ? 'flex-row-reverse space-x-reverse' : ''
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        setShowReactionPicker(false);
      }}
    >
      <img
        src={message.author.avatar}
        alt={message.author.name}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-slate-700/50"
      />
      
      <div className={`flex-1 ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`flex items-center space-x-2 mb-1 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <span className="font-semibold text-white text-sm">{message.author.name}</span>
          <span className="text-xs text-slate-400">{formatTime(message.timestamp)}</span>
          {isOwn && (
            <div className="flex items-center">
              {message.isRead ? (
                <CheckCheck className="w-3 h-3 text-blue-400" />
              ) : (
                <Check className="w-3 h-3 text-slate-400" />
              )}
            </div>
          )}
        </div>
        
        <div className={`relative ${isOwn ? 'self-end' : 'self-start'}`}>
          <div
            className={`max-w-lg p-3 rounded-2xl ${
              isOwn
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'bg-slate-700/80 text-slate-100 border border-slate-600/30'
            } backdrop-blur-sm message-hover`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>

          {/* Action buttons */}
          {showActions && (
            <div className={`absolute top-0 ${isOwn ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} flex items-center space-x-1 bg-slate-800/90 backdrop-blur-sm rounded-lg p-1 border border-slate-700/50 shadow-lg`}>
              <button
                onClick={() => setShowReactionPicker(!showReactionPicker)}
                className="p-1.5 text-slate-400 hover:text-yellow-400 hover:bg-slate-700/50 rounded transition-all"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 rounded transition-all">
                <MessageSquare className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-slate-400 hover:text-green-400 hover:bg-slate-700/50 rounded transition-all">
                <Share className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded transition-all">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick reaction picker */}
          {showReactionPicker && (
            <div className={`absolute ${isOwn ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} top-8 bg-slate-800/95 backdrop-blur-sm rounded-lg p-2 border border-slate-700/50 shadow-xl flex space-x-1 z-10`}>
              {quickReactions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleQuickReaction(emoji)}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-all text-lg hover:scale-110"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className={`flex items-center space-x-1 mt-2 ${isOwn ? 'self-end' : 'self-start'}`}>
            {message.reactions.map((reaction, index) => (
              <button
                key={index}
                onClick={() => onReaction(message.id, reaction.emoji)}
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-all ${
                  reaction.users.includes('Shivam')
                    ? 'bg-purple-600/30 border border-purple-500/50 text-purple-200'
                    : 'bg-slate-700/50 hover:bg-slate-700/80 text-slate-300'
                }`}
              >
                <span>{reaction.emoji}</span>
                <span>{reaction.count}</span>
              </button>
            ))}
          </div>
        )}

        {/* Reply count */}
        {message.replies && message.replies > 0 && (
          <button className={`text-xs text-blue-400 hover:text-blue-300 mt-1 transition-colors ${isOwn ? 'self-end' : 'self-start'}`}>
            {message.replies} {message.replies === 1 ? 'reply' : 'replies'}
          </button>
        )}
      </div>
    </div>
  );
}