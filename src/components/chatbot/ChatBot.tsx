import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatBotProps {
  avatarId?: string;
  avatarName?: string;
  avatarImageUrl?: string;
}

export function ChatBot({
  avatarId = "default",
  avatarName = "AI Assistant",
  avatarImageUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=assistant",
}: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hi there! I'm ${avatarName}. How can I help you today?`,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(message),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      return `Hello! How can I assist you with your AI avatar today?`;
    } else if (
      lowerCaseMessage.includes("avatar") &&
      lowerCaseMessage.includes("create")
    ) {
      return "To create a new avatar, click the 'Create Avatar' button in the dashboard. You can customize its appearance, voice, and behavior!";
    } else if (lowerCaseMessage.includes("nsfw")) {
      return "NSFW content can be toggled in the avatar settings. Please ensure you comply with our community guidelines when creating such content.";
    } else if (lowerCaseMessage.includes("voice")) {
      return "You can generate custom voices for your avatar in the Avatar Studio. We offer various voice types and customization options.";
    } else if (
      lowerCaseMessage.includes("animation") ||
      lowerCaseMessage.includes("animate")
    ) {
      return "The Animation Studio allows you to create custom animations for your avatar. You can use preset animations or sync with audio for lip movements.";
    } else if (lowerCaseMessage.includes("thank")) {
      return "You're welcome! Feel free to ask if you have any other questions about your AI avatars.";
    } else {
      return "I'm here to help with your AI avatar needs. You can ask me about creating avatars, voice generation, animations, or any other features!";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : 480,
            }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="mb-2"
          >
            <Card className="w-80 shadow-lg border-primary/20">
              <CardHeader className="p-3 border-b flex flex-row items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={avatarImageUrl} alt={avatarName} />
                    <AvatarFallback>{avatarName.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-sm font-medium">
                    {avatarName}
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={toggleMinimize}
                  >
                    {isMinimized ? (
                      <Maximize2 className="h-4 w-4" />
                    ) : (
                      <Minimize2 className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={toggleChat}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {!isMinimized && (
                <>
                  <ScrollArea className="h-80 p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {msg.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" />
                              <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce delay-75" />
                              <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce delay-150" />
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  <CardFooter className="p-3 border-t">
                    <div className="flex w-full items-center space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="flex-1"
                      />
                      <Button
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
        onClick={toggleChat}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
