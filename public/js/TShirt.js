async function getProducts() {
    const urlParams = new URLSearchParams(window.location.search);

    // ('') 未知道要輸入咩參數
    const id = urlParams.get('TShirt');
    try {
      const response = await fetch(`/t-Shirt`);
      const data = await response.json();
      const productArray = data.product; // Access the correct property in the response data
  
      const container = document.getElementById('TShirtsContainer');
      container.innerHTML = '';
      let productHTML = '';
      for (const product of productArray) {
        const productId = product.id
        const productName = product.name;
        const productPrice = product.price;
        const description = product.description;
        const image = product.image;
  
        productHTML +=
          // `<div class="productBox col-3">
          `
          <div  class="col-3 my-2">
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
              
            </div>
          </div>`;
      }

      container.innerHTML = productHTML;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

getProducts()