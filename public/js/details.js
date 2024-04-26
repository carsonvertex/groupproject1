//backend set route path -> customerRouter.get(`/details/:id`, singleProduct);
//射資料去 -> /customer/details/${productId}`
//我地set左 http://localhost:8080/details.html?product=${id} 作爲瀏覽頁
//用URLSearchParams get 個 ${id}
//用個 ${id} fetch返 res json from -> /customer/details/${productId}`
//拆入面valuable
// innerHTML += .....
//最後 container.appendChild(productElement);

async function singleProducts() {
    const container = document.getElementById('detailProductContainer');
    const productNameContainer = document.getElementById('productNameContainer');
    const carouselPicContainer = document.getElementById('carouselPicContainer');

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');  //http://localhost:8080/details.html?product=1
  
    try {
      const response = await fetch(`/customer/details/${productId}`); //呢條path suppose唔會入去 純res data
      const product = await response.json();
  
      if (response.ok) {
        const uploadedAt = product.uploaded_at;
        const productName = product.name;
        const productPrice = product.price;
        const description = product.description;
        const image = product.image;
  
        const productElement = document.createElement('div');
        //Product Name
        productNameContainer.innerHTML=`<h3>${productName}</h3>`
        //Product Carousel
        // carouselPicContainer.innerHTML=`
        // <div class="carousel-item active">
        //   <img src="${image}" class="d-block w-100" alt="...">
        // </div>`
        // Product Info
        productElement.innerHTML = `
          <div><img src="${image}" width="30%"></div>
          <p>Price: $${productPrice}</p>
          <p>Description: ${description}</p>
          <p>Uploaded at: ${uploadedAt}</p>
        `;
        // Add product options
      const options = product.options;
      if (options && options.length > 0) {
        const optionsElement = document.createElement('div');
        optionsElement.innerHTML = '<h6 class="DeleteButton">Options:</h6>';

        options.forEach((option) => {
          const { id, color_name, color_code, sizing, stock } = option;
          const optionElement = document.createElement('div');
          optionElement.className = 'listDiv container-fluid';

          const optionContent = document.createElement('div');
          optionContent.className = 'row';

          const optionInfo = document.createElement('div');
          optionInfo.className = 'col-8';
          optionInfo.innerHTML = `
            <span id="colorInput_${option.id}">${id} - Color: ${color_name}</span> |
            <span id="colorCodeInput_${option.id}">Color Code: ${color_code}</span> |
            <span id="sizeInput_${option.id}">Size: ${sizing}</span> |
          `;

          const optionActions = document.createElement('div');
          optionActions.className = 'col-4 d-flex justify-content-end';

          const addToCartButton = document.createElement('button');
          addToCartButton.className = 'optionAddToCartButton';
          addToCartButton.dataset.optionId = option.id;
          addToCartButton.innerText = 'Add to Cart';

          const quantityInput = document.createElement('input');
          quantityInput.type = 'number';
          quantityInput.className = 'optionQuantityInput';
          quantityInput.placeholder = 'Quantity';
          quantityInput.min = 0; // Set the minimum value to 0

          addToCartButton.onclick = () => addtoCart(quantityInput.value, id);


          optionActions.appendChild(quantityInput);
          optionActions.appendChild(addToCartButton);

          optionContent.appendChild(optionInfo);
          optionContent.appendChild(optionActions);

          optionElement.appendChild(optionContent);
          optionsElement.appendChild(optionElement);
        });

        productElement.appendChild(optionsElement);
      }

      container.appendChild(productElement);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function addtoCart(quantity, product_options_id) {
  const res = await fetch("/cart/newShoppinglist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      product_options_id,
      quantity
    })
  })
  if (res.ok) {
    console.log("successfully add to cart")
  }
}
singleProducts();