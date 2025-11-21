// Load Firebase (safe — public keys allowed)
const firebaseConfig = {
  apiKey: "AIzaSyCQhLOHtHPJaVX8TnhnrHd0ej9L8LTWraw",
  authDomain: "skillsphere-ai-8e4d6.firebaseapp.com",
  projectId: "skillsphere-ai-8e4d6",
  storageBucket: "skillsphere-ai-8e4d6.firebasestorage.app",
  messagingSenderId: "169357920036",
  appId: "1:169357920036:web:1f372123f4a0c683fcd5b1"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
