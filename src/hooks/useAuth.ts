import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useRecoilState } from "recoil";
import { TokenController } from "../utils/tokenController";
import { postSignin, postSignout } from "../api/auth";
import { auth } from "../api/config/firebase";
import { $signinState } from "../recoil/signin/atoms";

const useAuth = () => {
  const tokenController = new TokenController();
  const [isSignedin, setIsSignedin] = useRecoilState($signinState);

  const signin = async () => {
    const provider = new GoogleAuthProvider();
    let idToken = "";

    try {
      const result = await signInWithPopup(auth, provider);
      idToken = await result.user.getIdToken();
    } catch (error) {
      console.error(error);
      throw new Error();
    }

    try {
      const { accessToken } = await postSignin(idToken);
      tokenController.setAccessToken(accessToken);
      tokenController.setTokenExpiryTime();
    } catch (error) {
      console.error(error);
      throw new Error();
    }
    setIsSignedin(true);
  };

  const signout = async () => {
    try {
      await postSignout();
    } catch (error) {
      console.error(error);
    }

    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }

    setIsSignedin(false);
    tokenController.clear();
  };

  return { isSignedin, signin, signout };
};

export default useAuth;
