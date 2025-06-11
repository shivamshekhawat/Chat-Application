import React, { useState, useRef } from 'react';
import { Send, Paperclip, Smile, Mic, Plus } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload: (file: File) => void;
  currentUser: string;
}

export default function MessageInput({ onSendMessage, onFileUpload, currentUser }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        onSendMessage('🎤 Voice message (3s)');
      }, 3000);
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-lg border-t border-slate-700/50 p-4">
      <div className="flex items-center space-x-3">
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
          title="Upload file"
        >
          <Plus className="w-5 h-5" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={handleFileSelect}
          accept="image/*,document/*"
        />

       
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message as ${currentUser}...`}
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-3 pr-20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none max-h-32 transition-all"
            rows={1}
          />
          
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <button 
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all"
              title="Attach file"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button 
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all"
              title="Add emoji"
            >
              <Smile className="w-4 h-4" />
            </button>
          </div>
        </div>

       
        {message.trim() ? (
          <button
            onClick={handleSend}
            className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full transition-all transform hover:scale-105 shadow-lg"
            title="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={toggleRecording}
            className={`p-3 rounded-full transition-all transform hover:scale-105 shadow-lg ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
            title={isRecording ? 'Stop recording' : 'Record voice message'}
          >
            <Mic className="w-5 h-5" />
          </button>
        )}
      </div>

      {isRecording && (
        <div className="mt-3 flex items-center justify-center space-x-2 text-red-400">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm">Recording voice message...</span>
        </div>
      )}
    </div>
  );
}