// js for the size elect at form
const selectElement = document.getElementById('selectSize');
selectElement.addEventListener('change', function () {
  selectElement.blur(); // Close the dropdown after an option is selected
});
//single product
async function singleProducts() {
  const container = document.getElementById('editProductContainer');
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('product');
  try {
    const response = await fetch(`/product/editOption/product/${productId}`);
    const product = await response.json();
    console.log("this is the product:", product)
    if (response.ok) {
      const uploadedAt = product.uploaded_at;
      const productName = product.name;
      const productPrice = product.price;
      const description = product.description;
      const image = product.image;

      const productElement = document.createElement('div');
      productElement.innerHTML = `
        <div style="background-color: grey">
          <h3>${productName}</h3>
          <div><img src="${image}" width="30%"></div>
          <p>Price: $${productPrice}</p>
          <p>Description: ${description}</p>
          <p>Uploaded at: ${uploadedAt}</p>
        </div>
      `;

      // Add product options
      const options = product.options;
      if (options && options.length > 0) {
        const optionsElement = document.createElement('div');
        optionsElement.innerHTML = '<h6 class="DeleteButton">Options:</h6>';
        
        options.forEach((option) => {
          const { id, color_name, sizing, stock } = option;
          const optionElement = document.createElement('p');
          optionElement.innerHTML = `
            Color: ${color_name} | Size: ${sizing} | Stock: ${stock}
            <button class="optionDeleteButton" data-option-id="${id}">Delete</button>`;
            console.log(id)
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
// Call the function when the page finishes loading
document.addEventListener('DOMContentLoaded', singleProducts);

//Add new Option
const createOption = document.querySelector('#addProductOptionForm').addEventListener('submit', async function (event) {
  event.preventDefault()

  const form = event.target
  const formObject = {
    color_name: form.color_name.value,
    color_code: form.color_code.value,
    sizing: form.sizing.value,
    stock: form.stock.value
  }
  console.log(formObject)


  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('product');

  console.log(`param is ${id}`);

  const res = await fetch(`/product/addOption/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObject)
  })
  if (res.ok) {
    console.log("hihi")
  }
})


// delete
const deleteOptionButtons = document.querySelectorAll('.optionDeleteButton');

deleteOptionButtons.forEach((button) => {
  button.addEventListener('click', async function (event) {
    event.preventDefault();
    const id = button.dataset.optionId;
    console.log("this is clientid", id)
    try {
      await deleteOptionById(id);
      // Instead of reloading the page, consider removing the deleted option from the DOM
      button.closest('.option-container').remove(); // Example: Remove the option container
    } catch (error) {
      console.error('Delete Failed:', error);
      Swal.fire("Delete Failed!");
    }
  });
});

async function deleteOptionById(id) {
  const response = await fetch(`/product/deleteOption/id=${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error('Failed to delete option');
  }
}

