// js for the size elect at form
const selectElement = document.getElementById('selectSize');
selectElement.addEventListener('change', function () {
  selectElement.blur(); // Close the dropdown after an option is selected
});
async function singleProducts() {
  const container = document.getElementById('editProductContainer');
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('product');
  try {
    const response = await fetch(`/product/editProduct/${productId}`);
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
        <div>
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

      // delete
      const deleteOptionButtons = document.querySelectorAll('.optionDeleteButton');

      deleteOptionButtons.forEach((button) => {
        button.addEventListener('click', async function (event) {
          event.preventDefault();
          const id = button.dataset.optionId;
          console.log("this is clientid", id);
          try {
            await deleteOptionById(id);
            // Instead of reloading the page, consider removing the deleted option from the DOM
            button.closest('.listDiv').remove(); // Example: Remove the parent container
          } catch (error) {
            console.error('Delete Failed:', error);
            Swal.fire("Delete Failed!");
          }
        });
      });

      async function deleteOptionById(id) {
        const response = await fetch(`/product/deleteOption/${id}`, {
          method: "DELETE"
        });

        if (!response.ok) {
          throw new Error('Failed to delete option');
        }
      }

      // Add an event listener to the "Edit" button
      // Display an input field or a modal with editable fields
      // Allow the user to update the product option values
      // Retrieve the updated values
      const editOptionButtons = document.querySelectorAll('.optionEditButton');

      editOptionButtons.forEach((button) => {
        button.addEventListener('click', function (event) {
          event.preventDefault();
          const id = button.dataset.optionId;
          const optionContainer = button.closest('.listDiv');
          const optionContent = optionContainer.querySelector('.col-10');

          if (button.textContent === 'Edit') {
            button.textContent = 'Update';

            // Create the input fields using innerHTML
            optionContent.innerHTML = `
        <input type="text" id="colorInput_${id}" placeholder="Color">
        <input type="text" id="colorCodeInput_${id}" placeholder="Color Code">
        <select type="text" id="sizeInput_${id}" placeholder="Size">
                    <option value="">Choose an option</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
        <input type="text" id="stockInput_${id}" placeholder="Stock">
      `;
          } else {
            button.textContent = 'Edit';

            // Retrieve the updated values from the input fields
            const updatedColor = optionContainer.querySelector(`#colorInput_${id}`).value;
            const updatedColorCode = optionContainer.querySelector(`#colorCodeInput_${id}`).value;
            const updatedSize = optionContainer.querySelector(`#sizeInput_${id}`).value;
            const updatedStock = optionContainer.querySelector(`#stockInput_${id}`).value;

            // Call the update function here
            updateOptionById(id, {
              color: updatedColor,
              color_code: updatedColorCode,
              size: updatedSize,
              stock: updatedStock
            })
              .then(() => {
                // Update the option's content in the DOM
                optionContent.innerHTML = `Color: ${updatedColor} | Color Code: ${updatedColorCode} | Size: ${updatedSize} | Stock: ${updatedStock}`;
              })
              .catch((error) => {
                console.error('Update Failed:', error);
                Swal.fire("Update Failed!");
              });
          }
        });
      });

      async function updateOptionById(id, updatedValues) {
        try {
          const response = await fetch(`/product/updateOption/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedValues)
          });
      
          if (!response.ok) {
            throw new Error('Update Failed');
          }
      
          // Handle the response or return any necessary data
          // ...
        } catch (error) {
          throw new Error(error.message);
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
// Call the function when the page finishes loading
document.addEventListener('DOMContentLoaded', singleProducts);

const createOption = document.querySelector('#addProductOptionForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const form = event.target;
  const formObject = {
    color_name: form.color_name.value,
    color_code: form.color_code.value,
    sizing: form.sizing.value,
    stock: form.stock.value
  };
  console.log(formObject);

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('product');
  console.log(`param is ${id}`);

  const res = await fetch(`/product/addOption/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObject)
  });

  if (res.ok) {
    console.log("hihi");
  }
});