const loginForm = document.querySelector("#LoginForm")

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
  
    // Client-side validation
    if (!username || !password) {
      // Display an error message to the user
      console.error("Username and password are required.");
      return;
    }
  
    let res = await fetch("/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
  
  
    if (res.ok) {
      let data = await res.json()
      let level = data.level.level
  
      if (level === 'customer'){
        window.location.href = "/index.html";
      } 
      if (level === 'admin'){
        window.location.href = "/cat.html";
      }
      if (level === 'superadmin'){
        window.location.href = "/superadmin.html";
      } 
    } else {
      // Handle the case when the response is not ok
      // Display an error message to the user
      console.error("Login failed. Please check your username and password.");
    }
  });
}
