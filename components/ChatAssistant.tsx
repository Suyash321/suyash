import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ChatAssistantProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, setIsOpen }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Web Speech API for real voice input
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await getGeminiResponse(input, messages);
    const assistantMsg: ChatMessage = { role: 'assistant', content: aiResponse };
    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-8 z-50 bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-full shadow-2xl font-mono text-xs uppercase tracking-widest hover:scale-110 transition-all flex items-center space-x-3 border border-white/20"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="font-bold">Suyash Assistant</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-44 right-8 w-[350px] md:w-[450px] h-[600px] z-[60] bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-2xl flex flex-col overflow-hidden fade-in border-t-8 border-black dark:border-white">
          <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center">
            <div>
              <h5 className="font-display font-bold text-lg leading-tight uppercase">SUYASH AGENT</h5>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Protocol: Active</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-50 p-2">✕</button>
          </div>
          
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 font-mono text-[13px] leading-relaxed">
            {messages.length === 0 && (
              <div className="text-gray-400 p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                Greetings. Use the input below or voice protocol to query Suyash's architecture, design philosophy, or project availability.
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-5 py-3 rounded-xl max-w-[90%] ${
                  m.role === 'user' 
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg' 
                    : 'bg-gray-100 dark:bg-border-dark text-black dark:text-white border border-border-light dark:border-border-dark'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-400 italic">
                <span className="flex space-x-1">
                  <span className="w-1 h-1 bg-current rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </span>
                <span>Analysing response...</span>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-border-light dark:border-border-dark bg-gray-50 dark:bg-background-dark/50 flex flex-col gap-3">
            <div className="flex gap-2">
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Message Suyash's Neural..."
                className="flex-grow bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 outline-none transition-all shadow-sm"
              />
              <button 
                onClick={toggleListening}
                className={`px-4 rounded-lg transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 dark:bg-border-dark hover:bg-gray-300'}`}
                title="Voice Input"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </button>
            </div>
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg text-xs uppercase font-bold tracking-widest hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              Send Signal
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;