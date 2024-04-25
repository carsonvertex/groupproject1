async function getCategories() {
    try {
      let res = await fetch("/customer/category");
      let response = await res.json();
  
      if (res.ok) {
        let target = document.querySelector("#menuBar"); // Fix: Add "#" to select by ID
        target.innerHTML = ""; // Fix: Clear the innerHTML before appending new content
  
        for (let cat of response.data.cats) {
            const id = cat.id
            const catName = cat.name;
            const catLink = `/product.html?cat=${cat.id}`;
          target.innerHTML += `
            <div class="col ">
            <a class="btn btn-outline-secondary" href="${catLink}" role="button">${catName}</a>
           
              </div>
            </div>`;
        }
      }
  
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  
  getCategories();