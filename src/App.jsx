import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import { ChatProvider } from './contexts/ChatContext';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <ChatProvider>
      <div className="app">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="main-container">
          {sidebarOpen && <Sidebar />}
          <ChatInterface />
        </div>
      </div>
    </ChatProvider>
  );
}

export default App;
