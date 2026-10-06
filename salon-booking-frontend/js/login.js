const API_BASE_URL = "http://localhost:5000";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const loginData = {
        email: email,
        password: password
    };

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/users/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(loginData)
            }
        );

        if (!response.ok) {

            const errorText = await response.text();

            console.error("Login failed:", errorText);

            alert("Invalid email or password.");

            return;
        }

       const data = await response.json();

console.log("Login response:", data);

localStorage.setItem(
    "accessToken",
    data.token
);

alert("Login successful!");

window.location.href = "salons.html";
    } catch (error) {

        console.error("Login error:", error);

        alert("Unable to login. Please try again.");
    }
});