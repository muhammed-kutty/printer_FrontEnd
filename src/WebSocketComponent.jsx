import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  let socket;

  useEffect(() => {
    // Create a WebSocket connection
    socket = new WebSocket('wss://192.168.1.2:3002', {
      // rejectUnauthorized: false, // This option might be needed based on your certificate setup
    });

    // Connection opened
    socket.addEventListener('open', () => {
      console.log('Connected to Secure WebSocket server');
    });

    // Listen for messages
    socket.addEventListener('message', event => {
      setMessages(prevMessages => [...prevMessages, event.data]);
    });

    // Handle connection errors
    socket.addEventListener('error', error => {
      console.error('WebSocket error:', error);
    });

    // Handle connection close
    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
    });

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, []);

  const sendPrintCommand = () => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send('print');
    } else {
      console.error('WebSocket is not open');
    }
  };

  return (
    <div>
      <h1>Secure WebSocket Communication</h1>
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
