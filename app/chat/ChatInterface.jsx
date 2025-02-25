// app/chat/ChatInterface.jsx
'use client'; // Mark this as a client component

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // ... (rest of your chat logic)

  return (
    <ChatContainer>
      {/* ... (your JSX) */}
    </ChatContainer>
  );
};

export default ChatInterface;
