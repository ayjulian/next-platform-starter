// app/chat/ChatInterface.jsx
'use client'; // Mark this as a client component

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Styled components for modern design
const ChatContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  background: #1a1a1a;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 90vh;
`;

const MessagesWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background: #0d0d0d;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  margin: 1rem 0;
  padding: 1.5rem;
  border-radius: 20px;
  background: ${props => props.$isUser ? '#2d2d2d' : '#0066ff'};
  align-self: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  color: ${props => props.$isUser ? '#fff' : '#fff'};
  line-height: 1.6;
  position: relative;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const InputContainer = styled.div`
  padding: 2rem;
  background: #1a1a1a;
  border-top: 1px solid #333;
`;

const InputForm = styled.form`
  display: flex;
  gap: 1rem;
`;

const InputField = styled.input`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  background: #2d2d2d;
  color: #fff;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #0066ff;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  background: #0066ff;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #0052cc;
  }
  
  &:disabled {
    background: #4d4d4d;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  border: 4px solid #f3f3f3;
  border-top: 4px solid #0066ff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
`;

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
 const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = { content: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      setIsLoading(true);
      setInput('');

      // Replace with your actual API endpoint
      const response = await fetch('https://api.your-rag-service.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) throw new Error('API error');
      
      const data = await response.json();
      const botMessage = { 
        content: data.response,
        isUser: false,
        sources: data.sources // Assuming your API returns sources
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        content: "Sorry, there was an error processing your request.",
        isUser: false,
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContainer>
      <MessagesWrapper>
        {messages.map((msg, index) => (
          <MessageBubble key={index} $isUser={msg.isUser}>
            {msg.content}
            {msg.sources && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.8em', opacity: 0.8 }}>
                Sources: {msg.sources.join(', ')}
              </div>
            )}
          </MessageBubble>
        ))}
        {isLoading && (
          <MessageBubble $isUser={false}>
            <LoadingSpinner />
          </MessageBubble>
        )}
        <div ref={messagesEndRef} />
      </MessagesWrapper>

      <InputContainer>
        <InputForm onSubmit={sendMessage}>
          <InputField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isLoading}
          />
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : 'Send'}
          </SubmitButton>
        </InputForm>
      </InputContainer>
    </ChatContainer>
  );
};
export default ChatInterface;
