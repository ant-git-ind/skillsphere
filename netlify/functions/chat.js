const admin = require("firebase-admin");
const OpenAI = require("openai");
const fs = require("fs");
require("dotenv").config();

const serviceAccount = JSON.parse(
  fs.readFileSync(__dirname + "/serviceAccountKey.json", "utf8")
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.handler = async function(event, context) {
  try {
    const { prompt } = JSON.parse(event.body);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.choices[0].message.content })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
