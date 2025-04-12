// src/components/Message.jsx
import React from 'react';

function Message({ message }) {
  return (
    <div className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
      <div className="message-avatar">
        {message.isUser ? (
          <div className="user-avatar">U</div>
        ) : (
          <div className="bot-avatar">AI</div>
        )}
      </div>
      <div className="message-content">
        <div className="message-text">{message.text}</div>
        {message.documents && (
          <div className="document-references">
            <h4>Referenced Documents:</h4>
            <ul>
              {message.documents.map((doc, index) => (
                <li key={index}>
                  <span className="document-name">{doc.name}</span>
                  {doc.excerpt && <p className="document-excerpt">{doc.excerpt}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="message-timestamp">{message.timestamp}</div>
      </div>
    </div>
  );
}

export default Message;
