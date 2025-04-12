// src/components/MessageList.jsx
import React, { useEffect, useRef } from 'react';
import Message from './Message';
import Loading from './Loading';
import { useChat } from '../hooks/useChat';

function MessageList() {
  const { messages, loading } = useChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      
      {loading && <Loading />}
      
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
