async function login(username, password) {
  try {
    const response = await fetch('/account/getusername', {
      // Add any necessary headers or request parameters for authentication
    });

    if (response.ok) {
      const data = await response.json();
      const loggedInUsername = data.data.username;
      // Customize the content of the page based on the logged-in username
      const greetingDiv = document.querySelector('.accountButton');
      greetingDiv.innerHTML = `<button type="button" onclick="window.location.href = '/index.html'"class="btn btn-outline-primary me-2 logoutButton" >Logout</button><div>Hi, ${loggedInUsername}</div>`;
      // Add event listener to the new logout button
      const logoutButton = document.querySelector('.logoutButton');
      logoutButton.addEventListener('click', logout);
      // Remove the login button
      const loginButton = document.querySelector('.loginButton');
      if (loginButton) {
        loginButton.remove();

      }
    } else {
      // Handle login error
      console.log('Login failed');
    }
  } catch (error) {
    console.error('Error logging in', error);
  }
}

async function logout() {
  try {
    const response = await fetch('/account/logout', {
      method: 'POST',
      // Add any necessary headers or request parameters for authentication
    });

    if (response.ok) {
      // Handle successful logout, such as redirecting to the login page
      console.log('Logout successful');
      // Reset the content of the greetingDiv
      const greetingDiv = document.querySelector('.usernameConatiner');
      greetingDiv.innerHTML = '';
      // Add the login button back
      const accountButton = document.querySelector('.accountButton');
      accountButton.innerHTML = `<button type="button" onclick="window.location.href = '/login.html'" class="btn btn-outline-primary me-2 loginButton"> Login</button>`;
    } else {
      // Handle logout error
      console.log('Logout failed');
    }
  } catch (error) {
    console.error('Error logging out', error);
  }
}

// Example usage
const username = 'exampleUser';
const password = 'examplePassword';
login(username, password);


// back to last page button
function goBack() {
  window.history.back();
}