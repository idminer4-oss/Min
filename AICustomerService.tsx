
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, PhoneCall } from 'lucide-react';
import { getAIResponse } from '../services/gemini';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: number;
}

const AICustomerService: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I am your Coin IDR MINIER Assistant. How can I help you with your mining or deposits today?",
      sender: 'ai',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getAIResponse(input);
    
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: 'ai',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-500 p-2 rounded-lg">
            <Bot className="w-5 h-5 text-black" />
          </div>
          <div>
            <h4 className="font-bold text-sm">AI Support</h4>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[8px] text-gray-500 uppercase font-black">Active</span>
            </div>
          </div>
        </div>
        <a href="tel:083169046085" className="bg-white/5 p-2 rounded-lg text-yellow-500 hover:bg-white/10">
          <PhoneCall className="w-4 h-4" />
        </a>
      </div>

      {/* Chat History */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 custom-scrollbar">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm ${
              m.sender === 'user' 
              ? 'bg-yellow-500 text-black font-medium' 
              : 'bg-white/5 text-gray-200 border border-white/10'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />
              <span className="text-xs text-gray-500">AI is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Ask anything..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-yellow-500 text-black rounded-xl active:scale-95 transition-all disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-4 p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
        <p className="text-[10px] text-gray-500 text-center leading-relaxed">
          For manual verification, send your transaction receipt to: <br/>
          <span className="font-bold text-red-400">083169046085 (DANA / WA)</span>
        </p>
      </div>
    </div>
  );
};

export default AICustomerService;
