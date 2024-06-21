// import React, { useContext, useEffect, useState } from "react";
import { useState, useEffect, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function UserChats({ handleShowNavbar }) {
  // let SelectedId=0;
  const [chats, setChats] = useState([]);
  const [SelectedId, setSelectedId] = useState(0);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userchats", currentUser.uid), (doc) => {
        console.log("Current User data: ", doc.data());
        setChats(doc.data());
      });
      return () => unsub();
    };
    currentUser.uid && getChats();

    console.log(currentUser.uid);
  }, [currentUser.uid]);

  function selectUser(chat) {
    dispatch({ type: "CHANGE_USER", payload: chat[1].info });
    console.log(chat);

    handleShowNavbar();

    //Adding style to selected User
    document.getElementById(SelectedId)?.classList.remove("active");
    setSelectedId(chat[0]);
    document.getElementById(chat[0])?.classList.add("active");

    // setSelectedUser(chat);
  }

  return (
    <div className="Conversations">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className={`users`}
            key={chat[0]}
            style={{ display: "flex", gap: "8px", alignItems: "center" }}
            onClick={(e) => selectUser(chat)}
            data-key={chat[0]}
            id={chat[0]}
          >
            <img src={chat[1].info.photoURL} alt="" />
            <div className="userChatInfo">
              <h4>{chat[1].info.name}</h4>
              <p style={{ fontSize: "10px" }}>{chat[1].info.lastMessage}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default UserChats;
