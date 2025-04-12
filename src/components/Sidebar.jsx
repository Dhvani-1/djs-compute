// src/components/Sidebar.jsx
import React from 'react';
import { useChat } from '../hooks/useChat';

function Sidebar() {
  const { conversations, setActiveConversation, startNewConversation } = useChat();

  return (
    <aside className="sidebar">
      <button className="new-chat-button" onClick={startNewConversation}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        New Analysis
      </button>
      
      <div className="conversation-list">
        <h3>Recent Analyses</h3>
        {conversations.length === 0 ? (
          <p className="no-conversations">No previous analyses</p>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`conversation-item ${conversation.isActive ? 'active' : ''}`}
              onClick={() => setActiveConversation(conversation.id)}
            >
              <span className="conversation-title">{conversation.title}</span>
              <span className="conversation-date">{conversation.date}</span>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
