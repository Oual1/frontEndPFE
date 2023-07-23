import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



function SecFooter() {
  
  const navigate = useNavigate();
  function handleChatClick(){
   
    navigate('/chatRoom');

  }
 

 

   

  

  


  return (
    
    <Box sx={{ display: 'flex'}}>
      

        <hr style={{ borderTop: '1px solid', backgroundColor :"#2AC78C"}} />
        <AppBar style={{backgroundColor:"#2AC78C", bottom:'0', marginTop:"713px"}}>
      
        
      </AppBar>
      
      <AppBar style={{backgroundColor:"#A6B1B8", bottom:'0', marginTop:"720px"}}>
      <p style={{color:'black', textAlign:'center'}}>www.Corilus.be</p>
        
      </AppBar>
      
      
      
    </Box>
  );
}



export default SecFooter;












/* import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import './chatR.css';

const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState({});
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState('');
  const storedUsername = localStorage.getItem('email');
  const [userData, setUserData] = useState({
    username: storedUsername,
    receivername: '',
    connected: false,
    message: '',
  });
  let stompClient = null;
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    if (storedUsername) {
      setUserData({ ...userData, username: storedUsername });
      connectWebSocket();
    }
  }, []);

  const connectWebSocket = () => {
    let Sock = new SockJS('http://localhost:8086/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    setSocketConnected(true);

    if (stompClient) {
      stompClient.subscribe('/chatroom/public', onMessageReceived);
      stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
      userJoin();
    }
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: 'JOIN',
    };
    stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case 'JOIN':
        if (!privateChats[payloadData.senderName]) {
          privateChats[payloadData.senderName] = [];
          setPrivateChats({ ...privateChats });
        }
        break;
      case 'MESSAGE':
        setPublicChats((prevChats) => [...prevChats, payloadData]);
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    if (privateChats[payloadData.senderName]) {
      setPrivateChats((prevChats) => ({
        ...prevChats,
        [payloadData.senderName]: [...prevChats[payloadData.senderName], payloadData],
      }));
    } else {
      setPrivateChats((prevChats) => ({
        ...prevChats,
        [payloadData.senderName]: [payloadData],
      }));
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (socketConnected) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: 'MESSAGE',
      };
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  const sendPrivateValue = () => {
    if (socketConnected) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: 'MESSAGE',
      };

      if (userData.username !== tab) {
        setPrivateChats((prevChats) => ({
          ...prevChats,
          [tab]: [...prevChats[tab], chatMessage],
        }));
      }
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  return (
    <div className="container">
      {userData.connected && (
        <div className="chat-box">
          <div className="member-list">
            <ul>
              <li onClick={() => setTab('CHATROOM')} className={`member ${tab === 'CHATROOM' && 'active'}`}>
                Chatroom
              </li>
              {Object.keys(privateChats).map((name, index) => (
                <li
                  onClick={() => {
                    setTab(name);
                  }}
                  className={`member ${tab === name && 'active'}`}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {tab === 'CHATROOM' && (
            <div className="chat-content">
              <ul className="chat-messages">
                {publicChats.map((chat, index) => (
                  <li className={`message ${chat.senderName === userData.username && 'self'}`} key={index}>
                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                  </li>
                ))}
              </ul>

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button type="button" className="send-button" onClick={sendValue}>
                  send
                </button>
              </div>
            </div>
          )}
          {tab !== 'CHATROOM' && (
            <div className="chat-content">
              <ul className="chat-messages">
                {Array.isArray(privateChats[tab]) &&
                  privateChats[tab].map((chat, index) => (
                    <li className={`message ${chat.senderName === userData.username && 'self'}`} key={index}>
                      {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                      <div className="message-data">{chat.message}</div>
                      {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                    </li>
                  ))}
              </ul>

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button type="button" className="send-button" onClick={sendPrivateValue}>
                  send
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatRoom; */