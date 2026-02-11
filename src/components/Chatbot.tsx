import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Heart, Sparkles, MapPin, Building2, Dumbbell, Star, Clock } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const quickQuestions = [
  "How do I request a verification?",
  "What are credits?",
  "What is Trust Score?",
  "How do I become a verifier?",
];

const botResponses: { [key: string]: string } = {
  "how do i request a verification": "💕 To request a verification, simply click on the 'Nearby Places' page and select a location. You can request hotel checks, gym visits, or neighborhood tours. Our local verifiers will respond within 24 hours!",
  "what areas do you cover": "🗺️ We currently cover all major areas in Bangalore including Indiranagar, Koramangala, HSR Layout, Electronic City, Whitefield, and many more! Our network of local verifiers is growing daily.",
  "how much does it cost": "💰 Verification requests start at ₹299 for basic checks. Hotel verifications are ₹499, gym checks are ₹399, and comprehensive neighborhood tours are ₹599. You can also earn credits by becoming a verifier!",
  "how long does verification take": "⏱️ Most verifications are completed within 24-48 hours. Urgent requests can be expedited for an additional fee and completed within 4-6 hours!",
  "how do i earn credits": "🌟 Become a local verifier! Complete verification tasks in your area and earn credits. Each completed verification earns you 50-100 credits, which you can use for your own requests or withdraw as cash.",
  "what is a verification": "✅ A verification is when one of our trusted local verifiers visits a location (hotel, gym, or neighborhood) and provides real-time photos, videos, and detailed reports based on your specific requirements.",
  "how do i become a verifier": "🎯 Click on your Account page and select 'Become a Verifier'. You'll need to verify your identity, location, and complete a quick training. Once approved, you can start earning credits!",
  "trust score": "🏆 Your Trust Score (0-100) shows how reliable you are as a verifier! It increases with complete, fresh, and accurate verifications. Higher scores unlock Elite Local status with bonus credits and exclusive rewards. Check the Rewards page to see your score!",
  "trust level": "⭐ We have 4 trust levels: New Local (0-20), Verified Local (21-50), Trusted Local (51-80), and Elite Local (81-100). Each level unlocks better rewards and higher visibility for your verifications!",
  "rewards": "🎁 Visit the Rewards page to see your Trust Score, Credits balance, and unlock exclusive benefits! Complete quality verifications to level up from New Local → Verified → Trusted → Elite status.",
  "what are credits": "💰 Credits are rewards you earn for completing verifications! Use them for free verification requests, premium insights, priority listings, or convert 500+ credits to cash vouchers. Check your Rewards dashboard!",
  "default": "💖 Thank you for your question! Our team is here to help. You can browse nearby places, request verifications, or check your account page for more details. Is there anything specific you'd like to know about our verification services?"
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 💕 I'm your Locals.com assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return botResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
          >
            <MessageCircle className="w-7 h-7" />
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-600 to-red-600 opacity-75"
              animate={{ scale: [1, 1.3, 1], opacity: [0.75, 0, 0.75] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-pink-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-600 to-red-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Locals Assistant</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-white/90">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-pink-50/50 to-white">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white'
                        : 'bg-white border border-pink-200'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-pink-200 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-pink-600 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-pink-600 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-pink-600 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-pink-100 bg-white">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-100 to-red-100 text-pink-700 hover:from-pink-200 hover:to-red-200 transition-all"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-pink-100 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-full border border-pink-200 focus:outline-none focus:border-pink-600 transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-red-600 text-white flex items-center justify-center hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
