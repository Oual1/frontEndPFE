import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios' ;
import './chatR.css'

const ChatRoom = ({ username }) => {
  const [privateChats, setPrivateChats] = useState({});
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState('');
  const [userData, setUserData] = useState({
    username: username,
    receivername: '',
    connected: false,
    message: '',
  });
  let stompClient = null;
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  const connect = () => {
    let Sock = new SockJS('http://localhost:8086/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const disconnect = () => {
    if (stompClient) {
      stompClient.disconnect();
      setSocketConnected(false);
    }
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

const AuthenticatedChat = () => {
  const[storedUsername, setStoredUsername]=useState(null);
  const[user, setUser]=useState(null);
  const fetchUserName = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
       
        const roleResponse = await axios.get(`http://localhost:8080/api/v1/auth/user-name`, {
          headers: { Authorization: `${token}` }
        });
        console.log(roleResponse.data)
        
        setUser(roleResponse.data);
       
        axios.get(`http://localhost:8080/api/v1/auth/User/${roleResponse.data}`)
        .then(response => {
          setStoredUsername(response.data.firstname);
        })
        .catch(error => {
          console.error(error);
        });
     
       
      }
      
    } catch (error) {
      console.error('Erreur lors de la récupération du mail de l\'utilisateur:', error);
      // Gérez l'erreur ici
      setUser(0);
      
    }
   

  };
 
  useEffect(()=>{
       fetchUserName();
    
   },[]
 )
 
  return (
    <div>
      {storedUsername ? (
        <ChatRoom username={storedUsername} />
      ) : (
        <div>Veuillez vous connecter pour accéder au chat.</div>
      )}
    </div>
  );
};

export default AuthenticatedChat;