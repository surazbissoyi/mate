import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCkSyDU7xErZoq84f3avrpU3EEGXpdDM0E",
  authDomain: "suraz-mate.firebaseapp.com",
  projectId: "suraz-mate",
  storageBucket: "suraz-mate.appspot.com",
  messagingSenderId: "441847502068",
  appId: "1:441847502068:web:bfbfc810ec500478a7faa1",
  measurementId: "G-SG8W6N93K4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { storage };