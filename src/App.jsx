import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [text, setText] = useState('');

  const handlePrint = async () => {
      try {
          const response = await axios.post("http://192.168.1.2:3002/print");
          alert(response.data);
      } catch (error) {
          console.error('Error printing:', error);
          alert('Failed to print');
      }
  };

  return (
      <div className="App">
          <h1>Thermal Printer</h1>
          <button onClick={handlePrint}>Print</button>
      </div>
  );
}

export default App
