async function checkLogin() {
  try {
    const response = await fetch("/account/getusername", {
      // Add any necessary headers or request parameters for authentication
    });

    console.log(response.ok);
    const greetingDiv = document.querySelector('.accountButton');

    if (response.ok) {
      const data = await response.json();
      const loggedInUsername = data.data.username;
      // Customize the content of the page based on the logged-in username
      greetingDiv.innerHTML = `<button type="button" onclick="logout();" class="btn btn-outline-primary me-2 logoutButton accountButton">Logout</button><div>Hi, ${loggedInUsername}</div>`;
      // Add event listener to the new logout button
      const logoutButton = document.querySelector(".logoutButton");
      logoutButton.addEventListener("click", logout);
      // Remove the login button
      const loginButton = document.querySelector(".loginButton");
      if (loginButton) {
        loginButton.remove();
      }
    } else {
      greetingDiv.innerHTML = `<button type="button" class="btn btn-outline-primary me-2" id="loginButton" onclick="window.location.href = '/login.html'">Login</button>`;
      // Handle login error
      console.log("Login failed");
    }
  } catch (error) {
    console.error("Error logging in", error);
  }
}

async function logout() {
  try {
    const response = await fetch("/account/logout", {
      method: "POST", // Change request method to POST
      // Optionally, you can include headers or a request body if required
    });

    if (response.ok) {
      // Handle successful logout, such as redirecting to the login page
      console.log('Logout successful');
      // Reset the content of the greetingDiv
      const greetingDiv = document.querySelector('.accountButton');
      greetingDiv.innerHTML = '';
      // Add the login button back
      const accountButton = document.querySelector('.accountButton');
      accountButton.innerHTML = `<button type="button" onclick="window.location.href = '/login.html'" class="btn btn-outline-primary me-2" id="loginButton">Login</button>`;
    } else {
      // Handle logout error
      console.log('Logout failed');
    }
    window.location.href = "/index.html";
  } catch (error) {
    // Handle any errors that occur during logout
    console.error("Error logging out", error);
    // You can display an error message to the user or take other appropriate actions
    window.alert("An error occurred while logging out. Please try again later.");
  }
}

// Example usage
const username = 'exampleUser';
const password = 'examplePassword';
login(username, password);

// Back to the last page button
function goBack() {
  window.history.back();
}