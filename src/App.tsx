import React, { useState } from 'react';
import GPACalculator from './components/GPACalculator';
import ChatUI from './components/ChatUI';
import ThemeToggle from './components/ThemeToggle';
import Background from './components/Background';
import { useTheme } from './hooks/useTheme';
import { MessageSquare } from 'lucide-react';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen w-full relative">
      <Background isDark={isDark} />
      
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-indigo-900'}`}>
            Student Academic Portal
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Calculate your grades and get academic guidance
          </p>
        </header>
        
        <div className="flex justify-center">
          <GPACalculator className="md:w-2/3 lg:w-1/2" />
        </div>
        
        {/* Chat Button */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 z-20"
        >
          <MessageSquare size={24} />
        </button>
        
        {/* Chat UI */}
        <ChatUI isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        
        <footer className="mt-10 text-center">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            © {new Date().getFullYear()} Student Academic Assistant • All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;