// netlify/functions/createroom.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function handler(event, context) {
  try {
    const req = JSON.parse(event.body);

    const { recruiterId, seekerId } = req;

    const room = await addDoc(collection(db, "chatrooms"), {
      recruiterId,
      seekerId,
      messages: [],
      createdAt: Date.now()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ roomId: room.id })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
