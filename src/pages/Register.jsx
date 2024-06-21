import React, { useState } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, storage, db } from "../firebase";
import { useNavigate } from "react-router";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import "../Assets/Styles/register.css";

const Register = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // const file = e.target[3].files[0];
    const file = "";
    const url = "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg";

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: url,
        });

        setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          name,
          email,
          photoURL: url,
          createdAt: serverTimestamp(),
        });

        setDoc(doc(db, "userchats", user.uid), {});


        console.log(user);
        setErr(false);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(error);
        setErr(true);
      });

    // const storage = getStorage();
    // const storageRef = ref(storage, "images");

    // const uploadTask = uploadBytesResumable(storageRef, file);

    // uploadTask.on(
    //   (error) => {
    //     // Handle unsuccessful uploads
    //     console.log(error);
    //   },
    //   () => {
    //     // Handle successful uploads on complete
    //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       // console.log("File available at", downloadURL);
    //       updateProfile(auth.currentUser, {
    //         displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
    //       })

    //     });
    //   }
    // );
  }

  return (
    <div className="container">
      <div className="register">
        <h1>Register</h1>
        <form action="" onSubmit={handleSubmit} className="form">
          <div className="form-field">
            <input type="text" name="name" id="name" required/>
            <label for="name">Name</label>
          </div>
          <div className="form-field">
            <input type="text" name="email" id="email" required/>
            <label for="email">Email</label>
          </div>
          <div className="form-field">
            <input type="password" name="password" id="password" required/>
            <label for="password">Password</label>
          </div>
          <input type="submit" value="Register" />
          {err && <p style={{ color: "red" }}>Something went Wrong!</p>}
        </form>
        <p>
          Already have account? <a href="login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
