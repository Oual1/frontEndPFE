import React, { useState, useEffect, createContext } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './chat.css';
export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  let stompClient = null;

  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    if (username.trim()) {
      setConnected(true);
    }
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    if (messageInput.trim()) {
      const newMessage = {
        sender: username,
        content: messageInput,
        type: 'CHAT'
      };

      stompClient?.send('/app/chat.sendMessage', {}, JSON.stringify(newMessage));

      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatAppMessages')) || {};
    const userMessages = storedMessages[username] || [];
    setMessages(userMessages);
  }, [username]);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatAppMessages')) || {};
    const updatedMessages = {
      ...storedMessages,
      [username]: messages
    };
    localStorage.setItem('chatAppMessages', JSON.stringify(updatedMessages));
  }, [username, messages]);

  useEffect(() => {
    if (connected) {
      const socket = new SockJS('http://localhost:8080/ws');
      stompClient = Stomp.over(socket);

      stompClient.connect({}, (frame) => {
        console.log('Connected');

        stompClient.subscribe('/topic/public', (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      });
    }
  }, [connected]);

  const getAvatarColor = (messageSender) => {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    const colors = [
      '#007bff', '#6610f2', '#6f42c1', '#e83e8c', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8'
    ];
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  const chatContextValue = {
    username,
    setUsername,
    connected,
    setConnected,
    messages,
    setMessages,
    messageInput,
    setMessageInput,
    handleUsernameSubmit,
    handleMessageSubmit,
    getAvatarColor
  };

  return (
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;