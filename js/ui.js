// ui.js
// ----------------------------
// Reusable UI Helpers for SkillSphere AI
// ----------------------------

// Quick selector
export function el(id) {
  return document.getElementById(id);
}

// Toast message
export function toast(msg, time = 2500) {
  const div = document.createElement("div");
  div.className = "toast";
  div.innerText = msg;

  Object.assign(div.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "rgba(0,0,0,0.8)",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "8px",
    fontSize: "14px",
    backdropFilter: "blur(6px)",
    zIndex: 999999,
    animation: "fadeIn 0.3s ease"
  });

  document.body.appendChild(div);

  setTimeout(() => {
    div.style.opacity = 0;
    setTimeout(() => div.remove(), 300);
  }, time);
}

// Loading Overlay
export function showLoading(msg = "Loading...") {
  let loading = document.getElementById("globalLoader");

  if (!loading) {
    loading = document.createElement("div");
    loading.id = "globalLoader";
    loading.innerHTML = `
      <div class="loader-box">
        <div class="spinner"></div>
        <p>${msg}</p>
      </div>
    `;

    Object.assign(loading.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.65)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      color: "#fff",
      fontFamily: "Segoe UI",
      backdropFilter: "blur(5px)"
    });

    document.body.appendChild(loading);
  }
}

export function hideLoading() {
  const loading = document.getElementById("globalLoader");
  if (loading) loading.remove();
}

// Change title of the page dynamically
export function setTitle(title) {
  document.title = title;
}

// Wrapper for forms that use async functions
export function asyncForm(formId, callback) {
  const form = el(formId);
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showLoading();

    try {
      await callback();
    } catch (err) {
      console.error(err);
      toast("Something went wrong!");
    } finally {
      hideLoading();
    }
  });
}
