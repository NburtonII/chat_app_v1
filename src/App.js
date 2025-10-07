import React, { useState, useRef } from "react";
import "./Styles\\App.css";
import { Auth } from "./Components/Auth.js";
import { Chat } from "./Components/Chat.js";
import {signOut} from "firebase/auth"
import {auth} from "./firebase_config.js";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)

  const roomInputRef = useRef(null);

  const signUserOut = async () =>{
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if(!isAuth){
  return (
  <div> 
    <Auth setIsAuth = {setIsAuth}/>
  </div>
  )

  }
  
  return (
    <>
      {room ? (
        <Chat room ={room}/>
      ): (
        <div className = "room">
          <label>Enter Room Name:</label>
          <input  ref = {roomInputRef}/>
          <button onClick = {() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
      </div>
    )}  
    <div className="signout">
      <button onClick = {signUserOut} >sign out</button>
    </div>
    </>
  )
}
export default App