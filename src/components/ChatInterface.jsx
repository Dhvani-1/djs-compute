// src/components/ChatInterface.jsx
import React, { useState, useRef } from 'react';
import MessageList from './MessageList';
import DocumentUploader from './DocumentUploader';
import { useChat } from '../hooks/useChat';

function ChatInterface() {
  const [userInput, setUserInput] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const inputRef = useRef(null);

  const {
    sendMessage,
    loading,
    activeConversation,
    startNewConversation, // ✅ extract this here
  } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() && !loading) {
      sendMessage(userInput);
      setUserInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-interface">
      {activeConversation ? (
        <>
          <MessageList />
          <div className="chat-input-container">
            <button 
              className="upload-button" 
              onClick={() => setShowUploader(!showUploader)}
              aria-label="Upload document"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </button>
            
            <form onSubmit={handleSubmit} className="chat-form">
              <textarea
                ref={inputRef}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question about your legal case..."
                rows="1"
                className="chat-input"
              />
              <button 
                type="submit" 
                className="send-button" 
                disabled={!userInput.trim() || loading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
          
          {showUploader && (
            <DocumentUploader onClose={() => setShowUploader(false)} />
          )}
        </>
      ) : (
        <div className="welcome-screen">
          <h2>Welcome to Legal Case Analyzer</h2>
          <p>Upload legal documents and get AI-powered insights and analysis.</p>
          <button 
            className="start-button" 
            onClick={startNewConversation} // ✅ use already extracted function
          >
            Start New Analysis
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatInterface;
