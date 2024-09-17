import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WebSocketComponent = () => {
  const [Itemname, setItemname] = useState('');
  const [Price, setPrice] = useState('');
  const [serverId, setserverId] = useState('');
  const [companyname, setcompanyname] = useState("ABC")
  const [serverse, setserverse] = useState('')


    const token =localStorage.getItem('user_token')
    const serverID = localStorage.getItem('serverID')
  
  const url = "http://192.168.1.3:3002"
  console.log(serverse)
  useEffect(() => {
    if(!serverID){
      const fetchServers = async () => {
        try {
          const res = await axios.get(`${url}/api/print_servers`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setserverse(res?.data?.servers); // Assuming `setserverse` is a state setter function
        } catch (error) {
          console.error('Error fetching servers:', error);
        }
      };
      
      fetchServers();
    }
    else{
      return
    }
  
  }, [url, token]);
  
  const handlePrint = async () => {
    // You can replace this with your API call logic
    try {
       await axios.post(
        `${url}/api/print`, 
        {
          Itemname,
          Price,
          serverId: serverID ?serverID :serverId,
          companyname,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(res=>{
        console.log("res==",res)
      });
    
      // if (response.status === 200) {
      //   alert('Printed Successfully');
      // } else {
      //   alert('Failed to print');
      // }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred during printing',error?.response?.data?.messsage);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formGroup}>
        <input
          style={styles.input}
          type="text"
          placeholder="Item"
          value={Itemname}
          onChange={(e) => setItemname(e.target.value)}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Price"
          value={Price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <select
          style={styles.dropdown}
          value={serverId}
          onChange={(e) =>{
             serverID ? setserverId(e.target.value)
             :
             setserverId(e.target.value)
             localStorage.setItem("serverID",e.target.value)
            }}
        >
          <option value={serverID ? serverID : ""} disabled = {serverID? false : true}>{
             !serverID && serverse.length === 0 ?"No Server Connected"
             :
             serverID? serverID :
             'Please Select Your Server'
          }</option>
          {
            // serverID ? 
            // <option value={serverID}>{serverID}</option>
            // :
           
            serverse.length !==0 && 
              serverse.map((server)=>{
                return(
                  <>
                    <option value={server.ServerID}>{server.ServerID}</option>
                  </>
                ) 
                  
              })
          }
        </select>
        <button style={styles.button} onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width:"100%",
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  dropdown: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default WebSocketComponent;
