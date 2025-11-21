// Initialize Firebase Client SDK
const firebaseConfig = {
    apiKey: "AIzaSyCQhLOHtHPJaVX8TnhnrHd0ej9L8LTWraw",
    authDomain: "skillsphere-ai-8e4d6.firebaseapp.com",
    projectId: "skillsphere-ai-8e4d6",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

console.log("Firebase Loaded Successfully");
