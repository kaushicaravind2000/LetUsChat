import React from "react";
import "./Chat.css";
import  { useEffect, useState } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined, SettingsInputAntenna } from  "@material-ui/icons";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

function Chat() {
    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState([]);
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
       if (roomId) {
           db.collection("rooms")
           .doc(roomId)
           .onSnapshot((snapshot) => 
               setRoomName(snapshot.data().name));

               db.collection("rooms").doc(roomId).collection("messages").orderBy ('timestamp', 'asc').onSnapshot(snapshot =>(setMessages(snapshot.docs.map(doc => 
                doc.data()))
                ))
             }
    }, [roomId]);

const sendMessage = (e) => {
    e.preventDefault();
    console.log("you've typed >>>",input);

    db.collection('rooms').doc(roomId).collection('messages').add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
};
    
    return ( <div className="chat">
        <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} />
        <div className="chat__headerInfo">
            <h2>
              <b>{roomName}</b>
            </h2>
            <p>
                 last seen {" "}
                 {new Date(
                     messages[messages.length - 1]?.timestamp?.toDate()
                 ).toUTCString()}
            </p>
        </div>

        <div className="chat__headerRight">
        <IconButton>
                <SearchOutlined />
                </IconButton>
                <IconButton> <MoreVert /></IconButton>
               <IconButton> <AttachFile /></IconButton>
               
        </div>
        </div>
        <div className="chat__body">
            {messages.map(message => (
                 <p className={`chat__message ${message.name===user.displayName && 
                 "chat__reciever"}`}> <span className="chat__name">{message.name}</span>{message.message}
                    <span className="chat__timestamp">
                       {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span> 
                     </p>
                      ))}
           
        </div>
        <div className="chat__footer">
            <InsertEmoticonIcon />
            <form>
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type it Bitch" type="text" />
                <button onClick={sendMessage} type="submit"> Send Message</button>
            </form>
            <MicIcon />

        </div>
            
        </div>
    );
}

export default Chat;
