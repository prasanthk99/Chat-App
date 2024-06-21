import React, { useContext, useState } from "react";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Messages from "./Messages";
import { db } from "../firebase";
// import { signOut } from 'firebase/auth'
// import { auth } from '../firebase'
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Chat({ setShowNavbar }) {
  const [value, setValue] = useState();

  //Context Api
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  console.log("Sender Id :", currentUser.uid);
  console.log("Reciever Id :", data.user.id);

  const ChatId = data.chatId;

  // console.log(selectedUser);
  async function Send(e) {
    e.preventDefault();

    //CurrentUserChatRef to update the LastMessage of User
    const CurrentUserChatRef = doc(db, "userchats", currentUser.uid);

    //RecieverChatRef to update the LastMessage of Reciever
    const RecieverChatRef = doc(db, "userchats", data.user.id);

    console.log(ChatId);
    setValue("");

    //Add new Messages
    await updateDoc(doc(db, "chats", ChatId), {
      messages: arrayUnion({
        id: uuidv4(),
        text: value,
        SenderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    //Update the Current User LastMessage
    await updateDoc(CurrentUserChatRef, {
      // [selectedUserId]:{
      //   info:{
      //     lastMessage:value
      //   }
      // }
      [`${ChatId}.info.lastMessage`]: value,
    });

    //Update the Reciever LastMessage
    await updateDoc(RecieverChatRef, {
      // [selectedUserId]:{
      //   info:{
      //     lastMessage:value
      //   }
      // }
      [`${ChatId}.info.lastMessage`]: value,
    });

    // });
  }
  // console.log(ChatId)
  return (
    <div className="chat" onClick={() => setShowNavbar(false)}>
      <div className="chat-header">
        <img src="" alt="" srcset="" />
        <p>{data.user.name}</p>
        {/* <button onClick={()=>signOut(auth)}>logout</button> */}
      </div>
      <Messages selectedUser={data} />
      <form className="msg-input" onSubmit={Send}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Type your message here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
