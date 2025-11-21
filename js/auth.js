// auth.js
// ----------------------------
// Firebase Authentication Module
// ----------------------------

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { loadFirebase } from "./firebase.js";

export let auth = null;

// initialize auth
export async function initAuth() {
  await loadFirebase();

  auth = getAuth();
  window._fb = window._fb || {};
  window._fb.auth = auth;

  console.log("Firebase Auth loaded");

  // If no user → auto anonymous login
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.log("No user — signing in anonymously...");
      await signInAnonymously(auth);
    } else {
      console.log("Logged in as:", user.uid);
    }
  });
}

// Login using Google (Recruiters + Seekers)
export async function loginWithGoogle() {
  if (!auth) await initAuth();

  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google login success:", result.user);
    return result.user;
  } catch (err) {
    console.error("Google login failed:", err);
    alert("Google login failed");
  }
}

// Logout
export async function logout() {
  if (!auth) return;

  try {
    await signOut(auth);
    alert("Logged out!");
  } catch (e) {
    console.error("Logout failed:", e);
  }
}
