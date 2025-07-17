import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const params=new URLSearchParams(location.search), uid=params.get("uid");
onAuthStateChanged(auth,async user=>{
  if(!user||!uid)return location.href="login.html";
  const u=await getDoc(doc(db,"users",uid));
  document.getElementById("email").innerText=u.data().email;
  document.getElementById("followers").innerText=u.data().followers?.length||0;
  document.getElementById("following").innerText=u.data().following?.length||0;
  document.getElementById("followBtn").onclick=async()=>{
    const me=doc(db,"users",user.uid);
    if((await getDoc(me)).data().following.includes(uid)){
      await updateDoc(me,{following:arrayRemove(uid)});
      await updateDoc(doc(db,"users",uid),{followers:arrayRemove(user.uid)});
      document.getElementById("followBtn").innerText="Follow";
    }else{
      await updateDoc(me,{following:arrayUnion(uid)});
      await updateDoc(doc(db,"users",uid),{followers:arrayUnion(user.uid)});
      document.getElementById("followBtn").innerText="Unfollow";
    }
  };
  const q=query(collection(db,"videos"),where("uid","==",uid));
  const snaps=await getDocs(q);
  snaps.forEach(s=>document.getElementById("userVideos").innerHTML+=`<video src="${s.data().url}" controls width=200></video>`);
});