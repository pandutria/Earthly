import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOiQ82FrTslREPWMA8K8GB80_sTYtFSEE",
  authDomain: "outgamble.firebaseapp.com",
  projectId: "outgamble",
  storageBucket: "outgamble.appspot.com",
  messagingSenderId: "555276108178",
  appId: "1:555276108178:web:19925d76e0423c1014c14b"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
