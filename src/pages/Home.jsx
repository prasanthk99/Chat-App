import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

import { ChatContext } from "../context/ChatContext";

import "../Assets/Styles/home.css";

function Home() {
  // const [selectedUser,setSelectedUser] = useState(null);
  // console.log(selectedUser);
  const { data } = useContext(ChatContext);
  const [showNavbar, setShowNavbar] = useState(false);
  console.log(data);

  function handleShowNavbar() {
    setShowNavbar(!showNavbar);
  }

  return (
    <div className="home-page">
      <div className="content">
        <div className={`Nav-icon`} onClick={handleShowNavbar}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* <Sidebar setSelectedUser={setSelectedUser} selectedUser={selectedUser}/> */}
        {/* { !selectedUser? <h4 style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%"}}>Select the User</h4> : <Chat selectedUser={selectedUser} />} */}
        <Sidebar showNavbar={showNavbar} handleShowNavbar={handleShowNavbar} />
        {data.chatId == "" ? (
          <h4
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            Select the User
          </h4>
        ) : (
          <Chat setShowNavbar={setShowNavbar}/>
        )}
      </div>
    </div>
  );
}

export default Home;
