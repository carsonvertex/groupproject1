//category menu
async function getCategories() {
    try {
        let res = await fetch("/customer/category/");
        let response = await res.json();

        if (res.ok) {
            let target = document.querySelector("#menuBar"); // Fix: Add "#" to select by ID
            target.innerHTML = `<div class="col hoverDiv fingerPointer py-4" onclick="window.location.href = '/index.html'" >HOME</div>`; // Fix: Clear the innerHTML before appending new content

            for (let cat of response.data.cats) {
                const id = cat.id
                const catName = cat.name;
                target.innerHTML += `
                
                <div class="col hoverDiv fingerPointer py-4" onclick="window.location.href = '/category.html?cat=${id}'" >
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

      if (productId === null) {
        console.log("Fuck cat is null")
        return;
               
      }
  
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
          <div class="col-3 my-4 ">
            <div class="cardElement fingerPointer mx-4 my-4" onclick="window.location.href = '/details.html?product=${productId}'">
              <div><h5>${productName}</h5></div>
              <div class="constrained-div">
                <div class="content">
                  <img src="${image}">
                </div>
              </div>
              <div><b>Description: </b><br>
              ${description}</div >
              <div>Price: $${productPrice}</div>
            
            </div>
          </div>`;
      }
  
      container.innerHTML = productHTML;
    } catch (error) {
      console.error('Error fetching products:', error);
    
    }
  }
  getProducts()