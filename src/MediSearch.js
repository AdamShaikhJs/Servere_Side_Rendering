import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
const WebSocket = require('ws');

function MediSearch() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) {
      const ws = new WebSocket(
        'wss://public.backend.medisearch.io:443/ws/medichat/api'
      );

      ws.onopen = () => {
        setSocket(ws);
      };

      ws.onmessage = (event) => {
        const jsonData = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, jsonData]);
      };

      ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };
    }
  }, [socket]);

  const handleSearch = (question) => {
    if (socket) {
      const api_key = 'ffa19c5c-7530-44d4-853b-6234b966bd65'; // Replace with the actual API key
      const settings = { language: 'English' };
      const chatContent = {
        event: 'user_message',
        conversation: [question],
        settings,
        key: api_key,
        id: generateID(),
      };
      socket.send(JSON.stringify(chatContent));
    }
  };

  const generateID = () => {
    var id = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 32; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return id;
  };

  return (
    <div className="App">
      <h1>Medical Chat</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {JSON.stringify(message)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediSearch;
