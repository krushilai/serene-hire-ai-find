
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, User, X, Minimize2, Maximize2 } from "lucide-react";

interface Candidate {
  id: number;
  name: string;
  title: string;
  location: string;
  experience: string;
  skills: string[];
  education: string;
  summary: string;
  match: number;
}

// Mock candidate database - in a real app, this would come from your backend
const candidateDatabase: Candidate[] = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Data Scientist",
    location: "San Francisco, CA",
    experience: "5 years",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Data Analysis"],
    education: "Masters in Data Science from Stanford University",
    summary: "Passionate data scientist with expertise in ML and AI solutions for fintech",
    match: 95
  },
  {
    id: 2,
    name: "Marcus Johnson",
    title: "Full Stack Developer",
    location: "Austin, TX",
    experience: "3 years",
    skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
    education: "Bachelor's in Computer Science from UT Austin",
    summary: "Creative developer building scalable web applications with modern tech",
    match: 88
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "UX Designer",
    location: "Remote",
    experience: "4 years",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Adobe Creative Suite"],
    education: "Bachelor's in Design from Art Institute",
    summary: "User-centered designer creating intuitive digital experiences",
    match: 82
  },
  {
    id: 4,
    name: "David Park",
    title: "Data Scientist",
    location: "New York, NY",
    experience: "3 years",
    skills: ["Python", "R", "SQL", "Machine Learning", "Statistics"],
    education: "Bachelor's in Data Science from NYU",
    summary: "Analytical data scientist with strong background in statistical modeling",
    match: 90
  }
];

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  candidates?: Candidate[];
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your AI recruiting assistant. I can help you find candidates based on their skills, experience, location, education, and more. Try asking me something like 'Show me data scientists in New York with 3+ years of experience' or 'Find React developers with bachelor's degrees'.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const searchCandidates = (query: string): Candidate[] => {
    const lowercaseQuery = query.toLowerCase();
    
    return candidateDatabase.filter(candidate => {
      // Search in multiple fields
      const searchableText = [
        candidate.name,
        candidate.title,
        candidate.location,
        candidate.experience,
        candidate.education,
        candidate.summary,
        ...candidate.skills
      ].join(' ').toLowerCase();
      
      // Extract key terms from query
      const hasDataScience = lowercaseQuery.includes('data science') || lowercaseQuery.includes('data scientist');
      const hasNewYork = lowercaseQuery.includes('new york') || lowercaseQuery.includes('ny');
      const hasBachelors = lowercaseQuery.includes('bachelor') || lowercaseQuery.includes('degree');
      const hasExperience = lowercaseQuery.match(/(\d+)\s*(year|yr)/);
      const hasReact = lowercaseQuery.includes('react');
      const hasSkill = candidate.skills.some(skill => 
        lowercaseQuery.includes(skill.toLowerCase())
      );
      
      // Match candidates based on extracted criteria
      let matches = true;
      
      if (hasDataScience) {
        matches = matches && (candidate.title.toLowerCase().includes('data scientist') || 
                             candidate.education.toLowerCase().includes('data science'));
      }
      
      if (hasNewYork) {
        matches = matches && candidate.location.toLowerCase().includes('new york');
      }
      
      if (hasBachelors) {
        matches = matches && candidate.education.toLowerCase().includes('bachelor');
      }
      
      if (hasExperience) {
        const requiredYears = parseInt(hasExperience[1]);
        const candidateYears = parseInt(candidate.experience.match(/(\d+)/)?.[1] || '0');
        matches = matches && candidateYears >= requiredYears;
      }
      
      if (hasReact) {
        matches = matches && candidate.skills.some(skill => 
          skill.toLowerCase().includes('react')
        );
      }
      
      // Fallback to general text search if no specific criteria found
      if (!hasDataScience && !hasNewYork && !hasBachelors && !hasExperience && !hasReact) {
        matches = searchableText.includes(lowercaseQuery);
      }
      
      return matches;
    });
  };

  const generateResponse = (candidates: Candidate[], query: string): string => {
    if (candidates.length === 0) {
      return "I couldn't find any candidates matching your criteria. Try adjusting your search terms or being more specific about the requirements.";
    }
    
    if (candidates.length === 1) {
      const candidate = candidates[0];
      return `I found 1 candidate that matches your criteria: ${candidate.name}, a ${candidate.title} with ${candidate.experience} of experience, located in ${candidate.location}. They have a ${candidate.education} and specialize in ${candidate.skills.slice(0, 3).join(', ')}. ${candidate.summary}`;
    }
    
    return `I found ${candidates.length} candidates matching your criteria. Here are the top matches based on relevance and experience:`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const matchingCandidates = searchCandidates(inputValue);
      const response = generateResponse(matchingCandidates, inputValue);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        candidates: matchingCandidates.length > 0 ? matchingCandidates : undefined,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-purple-600 hover:bg-purple-700 shadow-lg"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 shadow-xl border-purple-200 ${isMinimized ? 'h-16' : 'h-[600px]'} transition-all duration-300`}>
        <CardHeader className="p-4 bg-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <CardTitle className="text-lg">AI Recruiting Assistant</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-purple-700 p-1"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-purple-700 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[536px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
                    <div className="flex items-start gap-2">
                      {message.type === 'bot' && <Bot className="w-4 h-4 mt-1 text-purple-600" />}
                      {message.type === 'user' && <User className="w-4 h-4 mt-1" />}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        
                        {/* Candidate Cards */}
                        {message.candidates && message.candidates.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.candidates.map((candidate) => (
                              <div key={candidate.id} className="bg-white border border-gray-200 rounded-lg p-3 text-gray-800">
                                <div className="flex items-start gap-3">
                                  <Avatar className="w-10 h-10">
                                    <AvatarFallback className="text-sm bg-purple-100 text-purple-700">
                                      {candidate.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-sm">{candidate.name}</h4>
                                    <p className="text-xs text-purple-600">{candidate.title}</p>
                                    <p className="text-xs text-gray-500">{candidate.location} • {candidate.experience}</p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {candidate.skills.slice(0, 3).map((skill) => (
                                        <Badge key={skill} variant="outline" className="text-xs">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                    <Badge variant="secondary" className="mt-2 text-xs bg-green-100 text-green-700">
                                      {candidate.match}% match
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-purple-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about candidates..."
                  className="flex-1 border-purple-200 focus:border-purple-400"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChatBot;
