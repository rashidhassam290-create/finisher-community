import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const $ = (id) => document.getElementById(id);
const form = $('auth-form'), email = $('email'), password = $('password'), nameInput = $('name');
const message = $('message'), submit = $('submit-btn');
let mode = 'login';
function say(text, error=false){ message.textContent=text; message.classList.toggle('error', error); }
function showMode(next){
  mode=next; const signup=mode==='signup';
  $('signin-tab').classList.toggle('active',!signup); $('signup-tab').classList.toggle('active',signup);
  $('form-title').innerHTML=signup?'JOIN THE <span>EMPIRE</span>':'ENTER THE <span>EMPIRE</span>';
  $('form-subtitle').textContent=signup?'Create your member account to continue.':'Sign in to continue to Finisher Community.';
  $('name').hidden=!signup; $('name-label').hidden=!signup; $('name').required=signup;
  password.autocomplete=signup?'new-password':'current-password';
  submit.innerHTML=signup?'CREATE ACCOUNT <span>↗</span>':'SIGN IN <span>↗</span>';
  $('switch-prompt').textContent=signup?'Already have an account?':'New to the Empire?';
  $('switch-btn').textContent=signup?'Sign in':'Create account';
  $('forgot-btn').hidden=signup; say('');
}
$('switch-btn').addEventListener('click',()=>showMode(mode==='login'?'signup':'login'));
$('signin-tab').addEventListener('click',()=>showMode('login'));
$('signup-tab').addEventListener('click',()=>showMode('signup'));
function ensureAuthConfigured(){
  if(!firebaseConfig.apiKey || firebaseConfig.apiKey==='PASTE_API_KEY_HERE' || !firebaseConfig.appId || firebaseConfig.appId==='PASTE_APP_ID_HERE') throw new Error('Firebase config is not complete yet. Follow README.txt and fill firebase-config.js.');
  return getAuthInstance();
}
let authInstance;
function getAuthInstance(){ if(!authInstance) authInstance=getAuth(initializeApp(firebaseConfig)); return authInstance; }
onAuthStateChanged(getAuthInstance(), user=>{ if(user) window.location.replace('home.html'); });
form.addEventListener('submit',async e=>{
  e.preventDefault(); say(''); submit.disabled=true;
  try{
    const auth=ensureAuthConfigured();
    if(mode==='signup'){
      const cred=await createUserWithEmailAndPassword(auth,email.value.trim(),password.value);
      const displayName=nameInput.value.trim(); if(displayName) await updateProfile(cred.user,{displayName});
      say('Account created. Opening the Empire…'); window.location.replace('home.html');
    }else{
      await signInWithEmailAndPassword(auth,email.value.trim(),password.value);
      window.location.replace('home.html');
    }
  }catch(err){ say(humanError(err),true); }
  finally{submit.disabled=false;}
});
$('google-btn').addEventListener('click',async()=>{
  say(''); try{const auth=ensureAuthConfigured();await signInWithPopup(auth,new GoogleAuthProvider());window.location.replace('home.html');}
  catch(err){say(humanError(err),true);}
});
$('forgot-btn').addEventListener('click',async()=>{
  say(''); if(!email.value.trim()){say('Enter your email address first, then choose Forgot password.',true);return;}
  try{await sendPasswordResetEmail(ensureAuthConfigured(),email.value.trim());say('Password reset email sent. Check your inbox and spam folder.');}
  catch(err){say(humanError(err),true);}
});
function humanError(err){
 const map={ 'auth/email-already-in-use':'This email already has an account. Try signing in.', 'auth/invalid-email':'Enter a valid email address.', 'auth/weak-password':'Choose a stronger password with at least 6 characters.', 'auth/invalid-credential':'Email or password is incorrect.', 'auth/popup-closed-by-user':'Google sign-in was closed before completion.', 'auth/unauthorized-domain':'This website domain is not authorized in Firebase Authentication settings.', 'auth/network-request-failed':'Network error. Check your internet and try again.' };
 return map[err.code] || err.message || 'Something went wrong. Please try again.';
}
// Decorative matrix background
const canvas=$('matrix'),ctx=canvas.getContext('2d');let w,h,drops=[];
function resize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight;drops=Array(Math.ceil(w/18)).fill(1)}
function draw(){ctx.fillStyle='rgba(7,9,18,.12)';ctx.fillRect(0,0,w,h);ctx.font='13px monospace';drops.forEach((y,i)=>{ctx.fillStyle=i%3===0?'#ff3ca6':'#39c5ff';ctx.fillText(Math.random()>.5?'1':'0',i*18,y*18);if(y*18>h&&Math.random()>.975)drops[i]=0;drops[i]++});requestAnimationFrame(draw)}
resize();draw();addEventListener('resize',resize);
