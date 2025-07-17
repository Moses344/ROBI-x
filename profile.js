import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

onAuthStateChanged(auth,user=>{
  if(!user) window.location.href="login.html";
  document.getElementById("user-info").innerText="Logged in as "+(user.displayName||user.email);
  loadMyVideos(user.uid);
});
async function loadMyVideos(uid){
  const q=query(collection(db,"videos"),where("uid","==",uid));
  const snaps=await getDocs(q);
  snaps.forEach(s=>document.getElementById("my-videos").innerHTML+=`<video src="${s.data().url}" controls width=200></video>`);
}