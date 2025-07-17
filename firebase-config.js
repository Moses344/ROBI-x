import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyDDoe-n9rpdzyGghRrCIFdZeUW-H89dr_U",
  authDomain: "robi-x.firebaseapp.com",
  projectId: "robi-x",
  storageBucket: "robi-x.appspot.com",
  messagingSenderId: "249776754685",
  appId: "1:249776754685:web:1c2a025c506e3da6d15394",
  measurementId: "G-48GVNKG53B"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);