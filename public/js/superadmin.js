fetch("/account/users")
  .then((response) => response.json())
  .then((data) => {
    // Process the retrieved data and generate HTML content
    // Example: Display user names in an unordered list
    const userList = document.querySelector("#userList");
    data.forEach((user) => {
      const listItem = document.createElement("li");
        listItem.textContent = `Email: ${user.email}\nUsername: ${user.username}\nLevel: ${user.level}\n`;
      userList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error("An error occurred while fetching users:", error);
    // Handle error case
  });

  const customerSpan = document.querySelector("#customer");
const adminSpan = document.querySelector("#admin");
const superadminSpan = document.querySelector("#superadmin");

customerSpan.addEventListener("click", handleSelection);
adminSpan.addEventListener("click", handleSelection);
superadminSpan.addEventListener("click", handleSelection);

function handleSelection(event) {
  const selectedSpan = event.target;
  // Perform actions based on the selected span
  console.log("Selected:", selectedSpan.textContent);
}