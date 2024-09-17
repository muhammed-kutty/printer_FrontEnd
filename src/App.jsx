import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import WebSocketComponent from './WebSocketComponent';

function App() {
  const url = "http://192.168.1.3:3002/login"
  const token =localStorage.getItem('user_token')
  useEffect(()=>{
    if(!token){
      axios.post(url,{
        MobilePhoneNumber:"9526137176",
        Password:"123"
      }).then(res=>{
        if(res?.data?.status === "success"){
          localStorage.setItem('user_token',res?.data?.data?.accessToken)
        }else{
          alert("login Faild")
        }
      })
    }else{
      return
    }
  },[])
 
  return (
     
      token ?(

        <WebSocketComponent/>
      )
      :(
        <h1>Please Login</h1>
      ) 
      
  );
}

export default App


