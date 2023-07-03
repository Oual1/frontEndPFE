import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './chat.css';

const ChatApp = () => {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);
    client.connect({}, () => {
      setConnected(true);
      setStompClient(client);
    }, (error) => {
      console.error('WebSocket connection error:', error);
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (stompClient) {
      stompClient.subscribe('/topic/public', (payload) => {
        const message = JSON.parse(payload.body);
        setMessages((prevMessages) => {
          const messageExists = prevMessages.find((prevMessage) => prevMessage.content === message.content);
          return messageExists ? prevMessages : [...prevMessages, message];
        });
      });
    }
  }, [stompClient]);

  useEffect(() => {
    const storedMessages = localStorage.getItem(`chatMessages-${username}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [username]);

  useEffect(() => {
    localStorage.setItem(`chatMessages-${username}`, JSON.stringify(messages));
  }, [username, messages]);

  const connect = (event) => {
    event.preventDefault();
    const trimmedUsername = username.trim();
    if (trimmedUsername) {
      setUsername(trimmedUsername);
      document.getElementById('username-page').classList.add('hidden');
      document.getElementById('chat-page').classList.remove('hidden');
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const messageContent = inputValue.trim();
    if (!connected || !messageContent) {
      return;
    }
    const chatMessage = {
      sender: username,
      content: inputValue,
      type: 'CHAT',
    };
    if (stompClient && stompClient.connected) {
      stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    }
    setInputValue('');
  };

  return (
    <div>
      <div id="username-page">
        <div className="username-page-container">
          <h1 className="title">Type your username to enter the Chatroom</h1>
          <form id="usernameForm" name="usernameForm" onSubmit={connect}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                placeholder="Username"
                autoComplete="off"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="accent username-submit">Start Chatting</button>
            </div>
          </form>
        </div>
      </div>

      <div id="chat-page" className="hidden">
        <div className="chat-container">
          <div className="chat-header">
            <h2>Spring WebSocket Chat Demo - By Alibou</h2>
          </div>
          <div className="connecting">
            {connected ? 'Connected' : 'Connecting...'}
          </div>
          <ul id="messageArea">
            {messages.map((message, index) => (
              <li key={index}>
                {message.type === 'JOIN' && (
                  <span>{message.sender} joined!</span>
                )}
                {message.type === 'LEAVE' && (
                  <span>{message.sender} left!</span>
                )}
                {message.type === 'CHAT' && (
                  <span>
                    <strong>{message.sender}: </strong>
                    {message.content}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <form id="messageForm" name="messageForm" onSubmit={sendMessage}>
            <div className="form-group">
              <div className="input-group clearfix">
                <input
                  type="text"
                  id="message"
                  placeholder="Type a message..."
                  autoComplete="off"
                  className="form-control"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="primary">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;