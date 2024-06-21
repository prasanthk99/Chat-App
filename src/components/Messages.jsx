import React, { useContext, useEffect, useRef, useState } from "react";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function Messages({ selectedUser }) {
  console.log(selectedUser);
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const ref = useRef();

  async function updateMessage() {
    const chatRef = doc(db, "chats", selectedUser.chatId);

    const docCollection = await getDoc(chatRef);

    if (!docCollection.exists()) {
      await setDoc(chatRef, { messages: [] });
    } else {
      const unsub = onSnapshot(chatRef, (doc) => {
        console.log("Current data: ", doc.data());
        setMessages(doc.data().messages);
      });

      return () => {
        unsub();
      };
    }
  }

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    updateMessage();
  }, [selectedUser]);

  console.log(currentUser.uid);

  return (
    <div className="messages">
      {messages.map((d) => (
        <div
          ref={ref}
          className={`msg-card ${d.SenderId == currentUser.uid && "owner"}`}
        >
          <img src="" alt="" srcset="" />
          {/* <p>Name</p> */}
          <p>{d.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Messages;
