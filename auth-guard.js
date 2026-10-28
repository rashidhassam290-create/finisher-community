import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";
if(!firebaseConfig.apiKey || firebaseConfig.apiKey==='PASTE_API_KEY_HERE' || !firebaseConfig.appId || firebaseConfig.appId==='PASTE_APP_ID_HERE'){
  document.body.innerHTML='<main style="font:18px Arial;color:white;background:#070912;min-height:100vh;padding:32px"><h1>Setup required</h1><p>Complete firebase-config.js using the values from Firebase Console, then reload this page.</p><a style="color:#39c5ff" href="index.html">Go to login</a></main>';
}else{
 const auth=getAuth(initializeApp(firebaseConfig));
 onAuthStateChanged(auth,user=>{const el=document.getElementById('member-name');const logout=document.getElementById('logout-button');if(el)el.textContent=user?(user.displayName||user.email||'MEMBER'):'GUEST';if(logout){logout.textContent=user?'LOG OUT':'SIGN IN / SIGN UP';logout.onclick=()=>{window.location.href='index.html';};if(user)logout.onclick=async()=>{await signOut(auth);window.location.replace('index.html');};}});
}
