
//single product

async function singleProducts() {
    const container = document.getElementById('editProductContainer');
    const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('product');
    try {
      const response = await fetch(`/product/editOption/product/${productId}`);
      const product = await response.json();
      console.log(product)
      if (response.ok) {
        const productElement = document.createElement('div');
          productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Description: ${product.description}</p>
          `;
          container.appendChild(productElement);
      }
   
      
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Call the function when the page finishes loading
  document.addEventListener('DOMContentLoaded', singleProducts);