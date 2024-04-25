window.addEventListener("load", () => {
    console.log("http://localhost:8080/cart/showShoppinglist")

   

    fetchCartItems()
})



async function fetchCartItems() {
    
    const res = await fetch("http://localhost:8080/cart/showShoppinglist") 
    const data = await res.json()
    if (res.ok) {
        console.log(data)
        let html = ''
        let right = ''
        let total = 0
        let totalProduct = 0
        const countArea = document.querySelector(".countArea")

        const container = document.querySelector(".MiddleLeft-Container")
        for (let item of data) {
            console.table(item)
            total += Number(item.price) * Number(item.quantity)
            totalProduct += Number(item.quantity)

            html += `  <div class="productArea">
            <div class="productArea-A">
                    <img width=100% height=100% src="${item.image}">
                </div>
                <div class="productArea-B">
                    <h6>Product: ${item.name}</h6>
                    
                    
                    <h6>Price: ${item.price}</h6>
                    <div class="dropdown-Quantity">
                        <h6>Quantity:</h6>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ${item.quantity}
                            </button>
                        </div>
                    </div>
                    
                </div>

                <div class="productArea-C">
                    <h4>Total Price: ${Number(item.price) * Number(item.quantity)}</h4>
                </div>

                

                


            </div>`
        }

        right += `  <div class="counter">
        <h5>UserID:  </h5>
        <h5>Total product: ${totalProduct}</h5>
        <h5>Address: Pick up at store</h5>
                </div>
                <h4>total amount: ${total}</h4>
                <div>

                </div>
                <div class="submitButton">
                    <button type="button" class="btn btn-primary btn-sm"
                    Onclick="window.location.href ='http://localhost:8080/checkout.html';">Submit</button>

                </div>

            </div>

        </div>
        <div class="Right-Container">
        </div>`
        container.innerHTML = html
        countArea.innerHTML = right

    }
} 






// // .querySelector 未有按購買位置
// const createProduct = document.querySelector('.productArea-B').addEventListener('buybutton', async function (event) {
//     event.preventDefault()

//     const form = event.target
//     const body = form

//     const formData = new FormData()
//     formData.append("image", form.image.files[0])
//     formData.append("name", form.name.value)
//     formData.append("price", form.price.value)
//     formData.append("description", form.description.value)

//     console.log(body)

// // 條path 未有
//     const res = await fetch(`/shopping_cart/showShoppinglist`, {
//         method: 'POST',
//         body: formData
//     })
//     if (res.ok) {
//         buyitemlist()
//     }
// })


// async function buyitemlist() {
//     const urlParams = new URLSearchParams(window.location.search);
//     // ('') 未有輸入既位於
//     // const id = urlParams.get('');
//     try {
//         const response = await fetch(`/shopping_cart/newShoppinglist`);
//         const data = await response.json();
//         const productArray = data.product; // Access the correct property in the response data

//         const container = document.getElementById('buyItemsContainer');
//         container.innerHTML = '';
//         let shopHTML = '';
//         for (const product of productArray) {
//             const productId = product.id
//             const image = product.image;
//             const productName = product.name;
//             const productPrice = product.price;
            

//             shopHTML +=
//             `<div class="productArea-A">
//             <img width=100% height=100% src="${image}">
//         </div>
//         <div class="productArea-B">
//             <p>${productName}</p>
//             <p>${description}</p>
//             <p>${productPrice}</p>
//         </div>
//             `;
//         }
//         container.innerHTML = shopHTML;
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// }

// buyitemlist()