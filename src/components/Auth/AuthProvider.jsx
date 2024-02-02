import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import axios from "axios";
import { TOKEN } from "../Shared/Token";

export const AuthContext = React.createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unSubs = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        axios
          .post("https://dev-town-server-2.vercel.app/api/v1/auth/login", {
            email: currentUser.email,
          })
          .then((data) => {
            // console.log(data?.data?.data);
            localStorage.setItem(TOKEN, data?.data?.data);
          });
      } else {
        localStorage.removeItem(TOKEN);
      }
      setLoading(false);
    });
    return () => {
      return unSubs();
    };
  }, []);

  const authInfo = {
    user,
    updateUserProfile,
    loading,
    googleSignIn,
    logOut,
    createUser,
    signIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
