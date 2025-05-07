import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Frown, ArrowDown } from 'lucide-react';
import { ChatMessage } from '../types';
import { findBestResponse } from '../data/chatResponses';

interface ChatUIProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const ChatUI: React.FC<ChatUIProps> = ({ className = '', isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content: "Hi there! I am avgeek and I will respond to any queries (academic only) based on my experience. I am still learning and adapting. If you want to suggest anything, feel free to connect on arushbhatnagar05@gmail.com",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollDown, setShowScrollDown] = useState(false);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const isNearBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 100;
    setShowScrollDown(!isNearBottom);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      content: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);
    
    setTimeout(() => {
      const response = findBestResponse(userMessage.content);
      
      const botMessage: ChatMessage = {
        content: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsThinking(false);
    }, 800);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-20 right-4 w-96 h-[500px] flex flex-col bg-gray-900 bg-opacity-85 backdrop-blur-sm rounded-xl shadow-2xl ${className}`}>
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <MessageSquare className="text-indigo-400 mr-2" size={22} />
          <h2 className="text-xl font-semibold text-indigo-400">Academic Assistant</h2>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition text-2xl leading-none"
        >
          ×
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 relative" onScroll={handleScroll}>
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`mb-4 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`rounded-lg px-4 py-2 max-w-[80%] shadow-md ${
                msg.isUser 
                  ? 'bg-indigo-700 text-white' 
                  : 'bg-gray-800 text-gray-200'
              }`}
            >
              <div className="mb-1">{msg.content}</div>
              <div className={`text-xs ${msg.isUser ? 'text-indigo-200' : 'text-gray-400'} text-right`}>
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isThinking && (
          <div className="mb-4 flex justify-start">
            <div className="bg-gray-800 rounded-lg px-4 py-3 text-gray-300 max-w-[80%] animate-pulse">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {showScrollDown && (
          <button 
            className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 shadow-lg transition-all duration-200"
            onClick={scrollToBottom}
          >
            <ArrowDown size={16} />
          </button>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about courses, study advice..."
          className="flex-1 bg-gray-700 border border-gray-600 text-white rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isThinking}
        />
        <button
          type="submit"
          className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-r-lg flex items-center justify-center transition-colors ${
            isThinking || !input.trim() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isThinking || !input.trim()}
        >
          {isThinking ? <Frown size={18} /> : <Send size={18} />}
        </button>
      </form>
    </div>
  );
};

export default ChatUI;