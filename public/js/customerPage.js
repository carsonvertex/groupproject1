// Frontend JavaScript code
async function login(username, password) {
    try {
      const response = await fetch('/account/getusername', {
      });
  
      if (response.ok) {
        const data = await response.json();
        const loggedInUsername = data.data.username;
        // Customize the content of the page based on the logged-in username
        const greetingDiv = document.querySelector('.usernameConatiner');
        greetingDiv.innerHTML += `<div>Hi, ${loggedInUsername}</div>`;
      } else {
        // Handle login error
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error logging in', error);
    }
  }
  
  // Example usage
  const username = 'exampleUser';
  const password = 'examplePassword';
  login(username, password);