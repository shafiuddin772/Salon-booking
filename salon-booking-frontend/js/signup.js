const API_BASE_URL = "http://localhost:5000";

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const signupData = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/users/signup`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(signupData)
            }
        );

        const data = await response.json();

        console.log("Signup response:", data);

        if (!response.ok) {
            alert(data.message || "Signup failed.");
            return;
        }

        alert("Registration successful!");

        window.location.href = "login.html";

    } catch (error) {

        console.error("Signup error:", error);

        alert("Unable to register. Please try again.");
    }
});