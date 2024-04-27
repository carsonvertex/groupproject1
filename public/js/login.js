document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("LoginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    // Client-side validation
    if (!username || !password) {
      // Display an error message to the user
      console.error("Username and password are required.");
      return;
    }

    try {
      let res = await fetch("/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (res.ok) {
        let data = await res.json();
        let level = data.level.level;

        if (level === "customer") {
          window.location.href = "/index.html";
        } else if (level === "admin") {
          window.location.href = "/cat.html";
        } else if (level === "superadmin") {
          window.location.href = "/superadmin.html";
        }
      } else {
        let errorMessage =
          "Login failed. Please check your username and password.";

        // Try to get more specific error message from server
        let errorResponse = await res.json();
        if (errorResponse && errorResponse.message) {
          errorMessage = errorResponse.message;
        }

        // Display an error message to the user
        console.error(errorMessage);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  });
});
