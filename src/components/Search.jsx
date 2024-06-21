import React, { useContext, useEffect, useState } from "react";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db, auth } from "../firebase";

import { AuthContext } from "../context/AuthContext";

function Search() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (username == "") {
      setErr(false);
    }
  }, [username]);

  const handleSearch = async (e) => {
    if (e.code === "Enter") {
      const Ref = collection(db, "users");
      setUsername(username);
      // Create a query against the collection.
      const q = query(Ref, where("name", "==", username));

      // console.log(q);

      setUsers([]);
      setErr(true);

      try {
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setUsers((prev) => [...prev, doc.data()]);
          setErr(false);
        });
      } catch (err) {
        console.log(err);
        setErr(true);
      }
    }
    console.log(users);
  };

  const searchSelect = async (id) => {
    const combinedId =
      currentUser.uid > id ? currentUser.uid + id : id + currentUser.uid;
    try {
      if (currentUser.uid == id) {
        // setErr(true);
        setUsername("");
        setUsers([]);
        return;
      }
      console.log(id);
      const userRef = collection(db, "users");
      const currentuserChatRef = doc(db, "userchats", currentUser.uid);
      const userChatRef = doc(db, "userchats", id);

      // Create a query against the collection.
      const q = query(userRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        // setUsers((prev)=>[...prev,doc.data()]);
        const data = doc.data();
        await updateDoc(currentuserChatRef, {
          [combinedId]: {
            info: {
              id: id,
              name: data.name,
              email: data.email,
              photoURL: data.photoURL,
              lastMessage: "",
            },
            date: serverTimestamp(),
          },
        });

        console.log(currentUser);

        await updateDoc(userChatRef, {
          [combinedId]: {
            info: {
              id: currentUser.uid,
              name: currentUser.displayName,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
              lastMessage: "",
            },
            date: serverTimestamp(),
          },
          // [currentUser.uid + id + ".date"]: serverTimestamp(),
        });

        setUsername("");
        setUsers([]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="search">
      <div className="search-box">
        <input
          type="text"
          name=""
          id=""
          placeholder="Find User"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleSearch}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {users &&
        users.map((user) => (
          <div
            className="userChat"
            style={{ display: "flex", gap: "6px", cursor: "pointer" }}
            key={user.id}
            onClick={() => searchSelect(user.id)}
          >
            <img
              src={user.photoURL}
              alt=""
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div className="userChatInfo">
              <span>{user.name}</span>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Search;
