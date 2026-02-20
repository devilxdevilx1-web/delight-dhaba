const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// LOGIN
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");

        try {
            const response = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                message.innerText = data.message;
                message.style.color = "red";
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            message.innerText = "Login successful!";
            message.style.color = "green";

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);

        } catch (error) {
            message.innerText = "Something went wrong";
            message.style.color = "red";
        }
    });
}

// SIGNUP
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        const signupMessage = document.getElementById("signupMessage");

        try {
            const response = await fetch("http://localhost:8000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                signupMessage.innerText = data.message;
                signupMessage.style.color = "red";
                return;
            }

            signupMessage.innerText = "Signup successful! Redirecting...";
            signupMessage.style.color = "green";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);

        } catch (error) {
            signupMessage.innerText = "Something went wrong";
            signupMessage.style.color = "red";
        }
    });
}