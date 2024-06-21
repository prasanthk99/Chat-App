import React, { useContext } from "react";
import Search from "./Search";
import UserChats from "./UserChats";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";

function Sidebar({ showNavbar, handleShowNavbar }) {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const imgstyle = {
    height: "40px",
    width: "40px",
    objectFit: "cover",
    borderRadius: "50%",
  };
  return (
    <div className={`sidebar ${showNavbar && "open"}`}>
      <div>
        <h4>{currentUser.displayName}</h4>
        <div style={{ display: "flex", gap: "4px" }}>
          <img src={currentUser.photoURL} alt="" style={imgstyle} />
          <button
            onClick={() => signOut(auth)}
            style={{ border: "none", padding: "4px", cursor: "pointer" }}
          >
            logout
          </button>
        </div>
      </div>
      <Search />
      <UserChats handleShowNavbar={handleShowNavbar} />
    </div>
  );
}

export default Sidebar;
