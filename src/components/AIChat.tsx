import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  PaperAirplaneIcon, 
  ExclamationTriangleIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'crisis' | 'normal';
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey there! I'm your AI wellness companion. I'm here to listen, support, and help you process your thoughts and feelings. What's on your mind today? 💙",
      sender: 'ai',
      timestamp: new Date(),
      type: 'normal'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Crisis keywords detection
  const crisisKeywords = [
    'suicide', 'kill myself', 'end my life', 'hurt myself', 
    'overdose', 'no reason to live', "i'm in danger", 'want to die'
  ];

  const checkForCrisis = (text: string): boolean => {
    return crisisKeywords.some(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // Mock AI responses
  const generateAIResponse = (userMessage: string): string => {
    if (checkForCrisis(userMessage)) {
      return "I hear that you're going through a really difficult time right now, and I'm concerned about you. Your feelings are valid, and you don't have to go through this alone. Please reach out to a crisis helpline immediately:\n\n🇺🇸 988 Suicide & Crisis Lifeline: 988\n🇺🇸 Crisis Text Line: Text HOME to 741741\n\nYou matter, and there are people who want to help you through this. Would you like to talk about some immediate coping strategies while you reach out for professional support?";
    }

    const responses = [
      "I hear you, and what you're feeling is completely valid. It sounds like you're dealing with something challenging. Can you tell me more about what's making you feel this way?",
      "Thank you for sharing that with me. It takes courage to open up about our feelings. What do you think might help you feel a little better right now?",
      "That sounds really tough. I'm glad you're reaching out and talking about this. Sometimes just expressing our thoughts can help us process them better.",
      "I can understand why that would be difficult. What are some things that have helped you cope with similar feelings in the past?",
      "It's okay to have these feelings - they're part of being human. What would you tell a good friend if they came to you with the same concern?",
      "That's a lot to handle. Remember that it's okay to take things one step at a time. What's one small thing you could do today to take care of yourself?"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'normal'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date(),
        type: checkForCrisis(inputText) ? 'crisis' : 'normal'
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col mood-card">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-wellness rounded-full flex items-center justify-center">
              <HeartIcon className="w-5 h-5 text-black" />
            </div>
            <div>
              <h3 className="font-semibold">AI Wellness Coach</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Online • Safe Space</span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            Private & Confidential
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-wellness text-black ml-auto'
                    : message.type === 'crisis'
                    ? 'bg-gradient-to-r from-danger/20 to-warning/20 border border-danger/30'
                    : 'bg-muted'
                }`}
              >
                {message.type === 'crisis' && (
                  <div className="flex items-center gap-2 mb-2 text-danger">
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Crisis Support</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-muted p-3 rounded-2xl max-w-[80%]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-mint rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-lilac rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-peach rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            size="icon"
            className="btn-hero h-10 w-10"
          >
            <PaperAirplaneIcon className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          💡 This AI provides support but isn't a replacement for professional help
        </p>
      </div>
    </Card>
  );
};

export default AIChat;