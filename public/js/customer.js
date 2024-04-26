//category menu
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
                // const catLink = `/customer/category/${cat.id}`;
                // <a class="btn btn-outline-secondary" href="${catLink}" role="button">${catName}</a>
                target.innerHTML += `
                
                <div class="col hoverDiv fingerPointer py-4" onclick="window.location.href = '/category.html?cat=${id}'">
                 ${catName}
                 </div>
                 </div>`;
            }
        }

    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}
getCategories();

async function getProducts() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('cat');
      let id = productId
  
      const response = await fetch(`/customer/category/${id}`);
      const data = await response.json();
      const productArray = data; // Access the correct property in the response data
  
      const container = document.getElementById("productContainer");
      container.innerHTML = "";
      let productHTML = "";
      for (const product of productArray) {
        const productId = product.id;
        const productName = product.name;
        const productPrice = product.price;
        const description = product.description;
        const image = product.image;
  
        productHTML += `
          <div class="col-3 my-2">
            <div class="cardElement fingerPointer" onclick="window.location.href = '/details.html?product=${id}'">
              <p><h5>${productName}</h5></p>
  
              <div class="constrained-div">
                <div class="content">
                  <img src="${image}">
                </div>
              </div>
  
              <p><b>Description: </b><br>
              ${description}</p>
              <p>Price: $${productPrice}</p>
            
            </div>
          </div>`;
      }
  
      container.innerHTML = productHTML;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  getProducts(1)