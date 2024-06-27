import React, { useState } from 'react';
import axios from 'axios'

const WebSocketComponent = () => {
  const [message, setMessage] = useState('');

  const handlePrint = async () => {
    try {
      const response = await axios.post('https://printrerrr-main.onrender.com/print');

      const result = await response.data;
      console.log('Response from server:', result);
    } catch (error) {
      console.error('Error sending print request:', error);
    }
  };

  return (
    <div>
      <button onClick={handlePrint}>Print Data</button>
    </div>
  );
};

export default WebSocketComponent;
