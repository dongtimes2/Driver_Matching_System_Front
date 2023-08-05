import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { postSignin } from "../auth";
import { setAccessToken, setRefreshToken } from "../config/axios";

export const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  let idToken = "";

  try {
    const result = await signInWithPopup(auth, provider);
    idToken = await result.user.getIdToken();
  } catch (error) {
    console.error(error);
  }

  try {
    const { accessToken, refreshToken } = await postSignin(idToken);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  } catch (error) {
    console.error(error);
  }
};

export const handleLogout = async () => {
  await signOut(auth);
};

export const handleCheckLoginStatus = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(user);
    } else {
      // console.log("없음");
    }
  });
};
