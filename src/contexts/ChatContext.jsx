// src/contexts/ChatContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // You'd need to install this package

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load conversations from localStorage on initial render
  useEffect(() => {
    const savedConversations = localStorage.getItem('legalChatConversations');
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('legalChatConversations', JSON.stringify(conversations));
  }, [conversations]);

  // Load messages for active conversation
  useEffect(() => {
    if (activeConversationId) {
      const activeConversation = conversations.find(
        (conv) => conv.id === activeConversationId
      );
      if (activeConversation) {
        setMessages(activeConversation.messages || []);
      }
    } else {
      setMessages([]);
    }
  }, [activeConversationId, conversations]);

  const startNewConversation = () => {
    const newConversationId = uuidv4();
    const newConversation = {
      id: newConversationId,
      title: `Case Analysis ${new Date().toLocaleDateString()}`,
      date: new Date().toLocaleDateString(),
      messages: [
        {
          id: uuidv4(),
          text: "Welcome to your new legal case analysis. Upload documents or ask questions about your case.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    };

    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversationId);
  };

  const setActiveConversation = (conversationId) => {
    setActiveConversationId(conversationId);
  };

  const sendMessage = async (text) => {
    if (!activeConversationId) {
      startNewConversation();
    }

    const userMessage = {
      id: uuidv4(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Add user message to the conversation
    setMessages((prev) => [...prev, userMessage]);
    
    // Update the conversation in our state
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeConversationId) {
          return {
            ...conv,
            messages: [...(conv.messages || []), userMessage],
          };
        }
        return conv;
      })
    );

    // Show loading state
    setLoading(true);

    try {
      // Mock API call for demonstration
      // In a real app, this would be an API call to your backend
      setTimeout(() => {
        const botResponse = {
          id: uuidv4(),
          text: `This is a simulated response to your message: "${text}". In a real implementation, this would be the response from your AI legal assistant based on the uploaded documents.`,
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
        };

        // Add bot message to the conversation
        setMessages((prev) => [...prev, botResponse]);
        
        // Update the conversation in our state
        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id === activeConversationId) {
              return {
                ...conv,
                messages: [...(conv.messages || []), botResponse],
              };
            }
            return conv;
          })
        );

        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error sending message:", error);
      setLoading(false);
      
      // Add error message
      const errorMessage = {
        id: uuidv4(),
        text: "Sorry, there was an error processing your request. Please try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
        isError: true,
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === activeConversationId) {
            return {
              ...conv,
              messages: [...(conv.messages || []), errorMessage],
            };
          }
          return conv;
        })
      );
    }
  };

  const value = {
    conversations,
    activeConversation: conversations.find((conv) => conv.id === activeConversationId),
    messages,
    loading,
    startNewConversation,
    setActiveConversation,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export default ChatContext;
