

// // // "/manageProduct/showProduct/cat/1"




//Show and Post products
const createProduct = document.querySelector('#productForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const form = event.target;
  const body = form;

  const formData = new FormData();
  formData.append("name", form.name.value);
  formData.append("image", form.image.files[0]);
  formData.append("price", form.price.value);
  formData.append("description", form.description.value);

  console.log("below get url");
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("cat");

  console.log(`param is ${id}`);

  const res = await fetch(`/product/newProduct/cat/${id}`, {
      method: 'POST',
      body: formData
  });
  if (res.ok) {
      getProducts();
  }
});
//show product

// async function getProducts() {
//     try {
//         const response = await fetch(`/product/showProduct?id=1`);
//         const data = await response.json();
//         const productArray = data.product;


//         // 在這裡處理取得的類別資料陣列
//         const container = document.getElementById('productContainer');
//         container.innerHTML = ""
//         let productHTML = '';
//         for (const product of productArray) {
//             const productName = product.name;
//             const productPrice = product.price;
//             // const productLink = `/product.html?product=${product.id}`;

//             productHTML += `<div class="productBox"><p>${productName}</p></div>`;
//         }

//         container.innerHTML = productHTML;
//     } catch (error) {
//         // 處理錯誤
//         console.error('Error:', error);
//         throw error;
//     }
// }

async function getProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('cat');
    try {
        const response = await fetch(`/product/showProduct?id=${id}`);
        const data = await response.json();
        const productArray = data.product; // Access the correct property in the response data
        console.log(productArray)
        const container = document.getElementById('productContainer');
        container.innerHTML = '';
        let productHTML = '';
        for (const product of productArray) {
            const productId = product.id
            const productName = product.name;
            const productPrice = product.price;
            const description = product.description;
            const image = product.image;

            productHTML +=
                `<div class="productBox col-3">
            <p>${productName}</p>
            <div><img src="${image}" width="80%"></div>
            <p>${description}</p>
            <p>${productPrice}</p>
            <a href="/editOption.html?product=${productId}"><button id="singleButton" >Edit Product</button></a>
            </div>`;
        }

   

        container.innerHTML = productHTML;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

getProducts()

//single product

async function singleProducts() {
    const container = document.getElementById('editProductContainer');
  
    try {
      const response = await fetch(`/product/editOption/product`);
      const data = await response.json();
  
      data.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
          <p>Description: ${product.description}</p>
        `;
        container.appendChild(productElement);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Call the function when the page finishes loading
  document.addEventListener('DOMContentLoaded', singleProducts);