import { OpenAI } from "openai";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function handler(event) {
    try {
        const req = JSON.parse(event.body);
        const { recruiterData, seekerData } = req;

        const prompt = `
Recruiter Requirement: ${JSON.stringify(recruiterData)}
Seeker Skills: ${JSON.stringify(seekerData)}

Rate the compatibility between 1 to 100 and explain shortly.
`;

        const aiRes = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }]
        });

        const result = aiRes.choices[0].message.content;

        await addDoc(collection(db, "matches"), {
            recruiterData,
            seekerData,
            result,
            timestamp: Date.now()
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: result })
        };

    } catch (err) {
        return { statusCode: 500, body: err.toString() };
    }
}
