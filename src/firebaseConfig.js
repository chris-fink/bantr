import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCINbbY4QVhh4CW-IYEnZmDvByAe6imDDE",
  authDomain: "bantr-ec260.firebaseapp.com",
  projectId: "bantr-ec260",
  storageBucket: "bantr-ec260.appspot.com",
  messagingSenderId: "1031107603876",
  appId: "1:1031107603876:web:924f7c72390b119443e531",
  measurementId: "G-CR7HKVB5NQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fireDb = getFirestore(app);

export { app , analytics , fireDb }