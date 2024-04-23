document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the username from local storage
  let username = localStorage.getItem("username");

  if (username) {
    // Customize the content of the page based on the username
    const greeting = document.querySelector("#loginButton");
    greeting.textContent = `Hi, ${username}`;
  }
});