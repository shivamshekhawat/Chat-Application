import React, { useState, useEffect, useRef } from 'react';
import ChatSidebar from './components/ChatSidebar';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import MessageInput from './components/MessageInput';
import TypingIndicator from './components/TypingIndicator';

interface Message {
  id: string;
  author: {
    name: string;
   
  };
  content: string;
  timestamp: Date;
  reactions?: { emoji: string; count: number; users: string[] }[];
  replies?: number;
  isRead?: boolean;
}

const initialMessages: Message[] = [
  {
    id: '1',
    author: {
      name: 'Shivam Shekhawat',
     
    },
    content: 'Hey Shivam! Welcome to our new chat space. This is going to be amazing for team collaboration! 🚀',
    timestamp: new Date(Date.now() - 3600000),
    reactions: [{ emoji: '🚀', count: 3, users: ['Bob', 'Carol', 'David'] }],
    replies: 2,
    isRead: true
  },
  {
    id: '2',
    author: {
      name: 'Shivam',
      
    },
    content: 'Absolutely! The interface looks fantastic. Great work on the design team! 👏',
    timestamp: new Date(Date.now() - 3000000),
    reactions: [{ emoji: '👏', count: 2, users: ['Shivam', 'Carol'] }],
    isRead: true
  },
  {
    id: '3',
    author: {
      name: 'Ravi',
     
    },
    content: 'I love how smooth the animations are. The gradient backgrounds and glassmorphism effects really make it feel modern and professional.',
    timestamp: new Date(Date.now() - 1800000),
    isRead: true
  },
  {
    id: '4',
    author: {
      name: 'Paras',
     
    },
    content: 'The voice messaging feature is a nice touch too. Can\'t wait to start using this for our daily standups!',
    timestamp: new Date(Date.now() - 900000),
    reactions: [{ emoji: '❤️', count: 1, users: ['Shivam'] }],
    isRead: false
  }
];

const channels = {
  '1': { name: 'general', memberCount: 12, unreadCount: 2 },
  '2': { name: 'random', memberCount: 8, unreadCount: 0 },
  '3': { name: 'development', memberCount: 6, unreadCount: 1 },
  '4': { name: 'design', memberCount: 4, unreadCount: 0 }
};


//const YOUR_AVATAR = 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face';

function App() {
  const [activeChannel, setActiveChannel] = useState('1');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>(['Alice Johnson', 'Bob Smith']);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  useEffect(() => {
    const interval = setInterval(() => {
      const shouldShowTyping = Math.random() > 0.8;
      if (shouldShowTyping) {
        const users = ['Alice Johnson', 'Bob Smith', 'Carol Davis'];
        const randomUser = users[Math.floor(Math.random() * users.length)];
        setTypingUsers([randomUser]);
        
        setTimeout(() => {
          setTypingUsers([]);
        }, 2000);
      }

    
      const allUsers = ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson'];
      const onlineCount = Math.floor(Math.random() * 3) + 1;
      const shuffled = allUsers.sort(() => 0.5 - Math.random());
      setOnlineUsers(shuffled.slice(0, onlineCount));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      author: {
        name: 'Shivam',
      
      },
      content,
      timestamp: new Date(),
      isRead: true
    };

    setMessages(prev => [...prev, newMessage]);

    // Mark previous messages as read when you send a message
    setMessages(prev => prev.map(msg => ({ ...msg, isRead: true })));

    // Simulate a response after a delay
    setTimeout(() => {
      const responses = [
        'That\'s a great point, Shivam!',
        'I completely agree with you.',
        'Thanks for sharing that insight!',
        'Interesting perspective, Shivam!',
        'Let me think about that...',
        'Good idea! Let\'s discuss this further.',
        'I have some thoughts on this too.',
        'That makes a lot of sense!',
        'Great suggestion, Shivam!',
        'Absolutely! I was thinking the same thing.',
        'Nice work on that implementation!',
        'Could you elaborate on that?',
        'I\'d love to hear more about your approach.',
        'That\'s exactly what we needed!',
        'Perfect timing with that message!'
      ];
      
      const authors = [
        { name: 'Shivam Shekhawat'},
        { name: 'Shiv' },
        { name: 'Ravi' },
        { name: 'Paras' }
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];

      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        author: randomAuthor,
        content: randomResponse,
        timestamp: new Date(),
        isRead: false
      };

      setMessages(prev => [...prev, responseMessage]);
    }, 1000 + Math.random() * 2000);
  };

  const handleFileUpload = (file: File) => {
    const fileMessage: Message = {
      id: Date.now().toString(),
      author: {
        name: 'Shivam',
        
      },
      content: `📎 Shared a file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
      timestamp: new Date(),
      isRead: true
    };

    setMessages(prev => [...prev, fileMessage]);

    // Simulate acknowledgment
    setTimeout(() => {
      const ackMessage: Message = {
        id: (Date.now() + 1).toString(),
        author: {
          name: 'Shivam Shekhawat',
          
        },
        content: 'Thanks for sharing that file, Shivam! 📄',
        timestamp: new Date(),
        isRead: false
      };
      setMessages(prev => [...prev, ackMessage]);
    }, 1500);
  };

  const handleVoiceCall = () => {
    const callMessage: Message = {
      id: Date.now().toString(),
      author: {
        name: 'System',
        
      },
      content: '📞 Shivam started a voice call',
      timestamp: new Date(),
      isRead: true
    };
    setMessages(prev => [...prev, callMessage]);
  };

  const handleVideoCall = () => {
    const callMessage: Message = {
      id: Date.now().toString(),
      author: {
        name: 'System',
        
      },
      content: '📹 Shivam started a video call',
      timestamp: new Date(),
      isRead: true
    };
    setMessages(prev => [...prev, callMessage]);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReactions = msg.reactions || [];
        const existingReaction = existingReactions.find(r => r.emoji === emoji);
        
        if (existingReaction) {
          // Toggle reaction
          if (existingReaction.users.includes('Shivam')) {
            existingReaction.count--;
            existingReaction.users = existingReaction.users.filter(u => u !== 'Shivam');
          } else {
            existingReaction.count++;
            existingReaction.users.push('Shivam');
          }
          
          return {
            ...msg,
            reactions: existingReactions.filter(r => r.count > 0)
          };
        } else {
          // Add new reaction
          return {
            ...msg,
            reactions: [...existingReactions, { emoji, count: 1, users: ['Shivam'] }]
          };
        }
      }
      return msg;
    }));
  };

  const currentChannel = channels[activeChannel as keyof typeof channels];
  const unreadCount = messages.filter(msg => !msg.isRead && msg.author.name !== 'Shivam').length;

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white flex overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        activeChannel={activeChannel}
        onChannelSelect={setActiveChannel}
        onlineUsers={onlineUsers}
        currentUser="Shivam"
        
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <ChatHeader
          channelName={currentChannel.name}
          memberCount={currentChannel.memberCount}
          unreadCount={unreadCount}
          onVoiceCall={handleVoiceCall}
          onVideoCall={handleVideoCall}
        />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
          <div className="space-y-1">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.author.name === 'Shivam'}
                onReaction={handleReaction}
              />
            ))}
            <TypingIndicator users={typingUsers} />
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <MessageInput
          onSendMessage={handleSendMessage}
          onFileUpload={handleFileUpload}
          currentUser="Shivam"
        />
      </div>
    </div>
  );
}

export default App;