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
          const { color_name, color_code, sizing, stock } = option;
          const optionElement = document.createElement('p');
          optionElement.innerHTML = `
          <div class="listDiv container-fluid">
          <div class="row">
          <div class="col-10">
             <span id="colorInput_${option.id}">Color: ${color_name}</span> | <span id="colorCodeInput_${option.id}">color_code: ${color_code}</span> | <span id="sizeInput_${option.id}">Size: ${sizing}</span> | <span id="stockInput_${option.id}">Stock: ${stock}</span>
          </div>
          <div class="col-2" style="display:flex;justify-content:flex-end">
          <button class="optionEditButton" data-option-id="${option.id}">Edit</button>
          <button class="optionDeleteButton" data-option-id="${option.id}">Delete</button>
          </div>
          </div>
          </div> `//added id=optionDelete buttons here
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
  
  singleProducts();
