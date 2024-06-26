import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  let socket;

  useEffect(() => {
    // Create a WebSocket connection
    socket = new WebSocket('ws://192.168.1.2:3002');

    // Connection opened
    socket.addEventListener('open', () => {
      console.log('Connected to WebSocket server');
    });

    // Listen for messages
    socket.addEventListener('message', event => {
      setMessages(prevMessages => [...prevMessages, event.data]);
    });

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, []);

  const sendPrintCommand = () => {
    socket.send('print');
  };

  return (
    <div>
      <h1>WebSocket Communication</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <button onClick={sendPrintCommand}>Print</button>
    </div>
  );
};

export default WebSocketComponent;
