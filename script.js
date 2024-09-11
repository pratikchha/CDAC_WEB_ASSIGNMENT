document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");
    const apiMessage = document.getElementById("apiMessage");
    const loading = document.getElementById("loading");
    const togglePassword = document.getElementById("togglePassword");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Clear previous error messages
        usernameError.textContent = "";
        passwordError.textContent = "";
        apiMessage.textContent = "";

        // Basic validation
        let isValid = true;

        if (!username.value || !validateEmail(username.value)) {
            usernameError.textContent = "Please enter a valid email.";
            isValid = false;
        }

        if (!password.value || password.value.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters long.";
            isValid = false;
        }

        if (!isValid) return;

        // Show loading spinner
        loading.classList.remove("hidden");

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value
                })
            });

            const data = await response.json();

            // Hide loading spinner
            loading.classList.add("hidden");

            if (response.ok) {
                apiMessage.textContent = "Login successful!";
                apiMessage.style.color = "green";
            } else {
                apiMessage.textContent = "Login failed: " + data.error || "Unknown error";
                apiMessage.style.color = "red";
            }
        } catch (error) {
            // Hide loading spinner
            loading.classList.add("hidden");
            apiMessage.textContent = "Network error. Please try again.";
            apiMessage.style.color = "red";

        }
    });

    togglePassword.addEventListener("click", () => {
        if (password.type === "password") {
            password.type = "text";
            togglePassword.classList.remove("fa-eye");
            togglePassword.classList.add("fa-eye-slash");
        } else {
            password.type = "password";
            togglePassword.classList.remove("fa-eye-slash");
            togglePassword.classList.add("fa-eye");
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
