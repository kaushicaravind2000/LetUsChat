import React, { useEffect, useState } from 'react';
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from './firebase';
import { Link } from 'react-router-dom';


function SidebarChat({ id, name, addNewChat}) {
   const [seed, setSeed] = useState("");
   const [messages, setMessages] = useState("");

  

   useEffect(() => {
       setSeed(Math.floor(Math.random() * 5000));
   }, []);

   useEffect(() => {
    if (id) {
        db.collection("rooms").doc(id).collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => 
            setMessages(snapshot.docs.map((doc) => 
            doc.data()))
        );
    }
}, [id]);

    function createChat() {
        const roomName = prompt("Please enter name for chat");
        if (roomName) {
            //db stuff
            db.collection('rooms').add({
                name: roomName,
            });
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
             <div className="sidebarChat">
           <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
           <div className="sidebarChat__info">
               <h3>{name}</h3>
               <p><b>{messages[0]?.message}</b></p>
              
           </div>
        </div>
        </Link>
       
    ) : ( 
           <div onClick={createChat} className="sidebarChat">
               <h2>ADD NEW CHAT</h2> </div> );
}

export default SidebarChat;
