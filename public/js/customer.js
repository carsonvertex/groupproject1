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

<<<<<<< Updated upstream
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}
getCategories();

async function getProducts() {
    try {
      const container = document.getElementById('productContainer');
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('cat')
  
      const response = await fetch(`/customer/category/${id}`);
      const data = await response.json();
      const productArray = data; // Access the correct property in the response data
  
      container.innerHTML = "";
      let productHTML = "";
      for (const product of productArray) {
        const productId = product.id;
        const productName = product.name;
        const productPrice = product.price;
        const description = product.description;
        const image = product.image;
  
        productHTML += `
        <div class="col-3 my-2 " onclick="window.location.href = '/details.html?product=${productId}'">
            <div class="cardElement fingerPointer">
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
      // <a href="/details.html?product=${productId}"><button id="singleButton">Add to Cart</button></a>
  
      container.innerHTML = productHTML;
    } catch (error) {
=======
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}
getCategories();

async function getProducts(id) {
    try {
    //   const urlParams = new URLSearchParams(window.location.search);
    //   const id = urlParams.get("product");
      console.log("param is " + id);
  
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
            <div class="cardElement">
              <p><h5>${productName}</h5></p>
  
              <div class="constrained-div">
                <div class="content">
                  <img src="${image}">
                </div>
              </div>
  
              <p><b>Description: </b><br>
              ${description}</p>
              <p>Price: $${productPrice}</p>
              <a href="/editOption.html?product=${productId}"><button id="singleButton">Add to Cart</button></a>
            </div>
          </div>`;
      }
  
      container.innerHTML = productHTML;
    } catch (error) {
>>>>>>> Stashed changes
      console.error("Error fetching products:", error);
    }
  }
  getProducts(1)