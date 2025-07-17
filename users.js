import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

onAuthStateChanged(auth, async user=>{
  if(!user) window.location.href="login.html";
  const snaps=await getDocs(collection(db,"users"));
  snaps.forEach(s=>{
    if(s.id===user.uid)return;
    const data=s.data();
    const btn=document.createElement('button');
    btn.innerText=(data.followers||[]).includes(user.uid)?"Unfollow":"Follow";
    btn.onclick=async()=>{
      const me=doc(db,"users",user.uid), them=doc(db,"users",s.id);
      if(btn.innerText==="Follow"){
        await updateDoc(me,{following:arrayUnion(s.id)});
        await updateDoc(them,{followers:arrayUnion(user.uid)});
        btn.innerText="Unfollow";
      }else{
        await updateDoc(me,{following:arrayRemove(s.id)});
        await updateDoc(them,{followers:arrayRemove(user.uid)});
        btn.innerText="Follow";
      }
    };
    document.getElementById("userList").append(data.email,btn,document.createElement('br'));
  });
});