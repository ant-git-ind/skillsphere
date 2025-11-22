const sendBtn = document.getElementById("sendBtn");
const promptBox = document.getElementById("prompt");
const responseBox = document.getElementById("response");

sendBtn.addEventListener("click", async () => {
  const prompt = promptBox.value.trim();
  if (!prompt) return;

  responseBox.textContent = "Loading...";
  try {
    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    responseBox.textContent = data.reply;
  } catch (err) {
    responseBox.textContent = "Error: " + err.message;
  }
});
