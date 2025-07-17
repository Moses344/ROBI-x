import { auth, db, storage } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, getDocs, addDoc, updateDoc, doc, query, orderBy, increment } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

onAuthStateChanged(auth, user => {
  if (!user) window.location.href = "login.html";
});

const container = document.getElementById("videos-container");
async function load() {
  const q = query(collection(db,"videos"), orderBy("createdAt","desc"));
  const snaps = await getDocs(q);
  snaps.forEach(docSnap => {
    const data=docSnap.data();
    const box=document.createElement('div');
    box.innerHTML=`
      <video src="${data.url}" controls></video>
      <p>${data.likes||0} likes <button onclick="like('${docSnap.id}')">Like</button></p>`;
    container.appendChild(box);
  });
}
window.like = async id=>{
  const refD=doc(db,"videos",id);
  await updateDoc(refD,{likes:increment(1)});
};
window.uploadVideo = async ()=>{
  const file=document.getElementById("video-file").files[0];
  const user=auth.currentUser;
  const stRef=ref(storage,"videos/"+file.name);
  await uploadBytes(stRef,file);
  const url=await getDownloadURL(stRef);
  await addDoc(collection(db,"videos"),{url,likes:0,createdAt:new Date(),uid:user.uid});
  window.location.reload();
};
load();