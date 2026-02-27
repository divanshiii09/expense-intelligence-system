const form = document.getElementById("auth-form");
const toggleBtn = document.getElementById("toggle-btn");
const formTitle = document.getElementById("form-title");
const nameField = document.getElementById("name");
const message = document.getElementById("message");

let isLogin = true;

toggleBtn.addEventListener("click", () => {
    isLogin = !isLogin;

    if (isLogin) {
        formTitle.textContent = "Login";
        nameField.classList.add("hidden");
        toggleBtn.textContent = "Register";
    } else {
        formTitle.textContent = "Register";
        nameField.classList.remove("hidden");
        toggleBtn.textContent = "Login";
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;

    const url = isLogin
        ? "http://localhost:5000/login"
        : "http://localhost:5000/register";

    const bodyData = isLogin
        ? { email, password }
        : { name, email, password };

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
    });

    const data = await response.json();
    message.textContent = data.message;
});
