import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDDoe-n9rpdzyGghRrCIFdZeUW-H89dr_U",
  authDomain: "robi-x.firebaseapp.com",
  projectId: "robi-x",
  storageBucket: "robi-x.appspot.com",
  messagingSenderId: "249776754685",
  appId: "1:249776754685:web:1c2a025c506e3da6d15394",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };