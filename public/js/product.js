// // // "/manageProduct/showProduct/cat/1"




const createProduct = document.querySelector('#productForm').addEventListener('submit', async function (event) {
    event.preventDefault()

    const form = event.target
    const body = form

    const formData = new FormData()
    formData.append("name", form.name.value)
    formData.append("image", form.image.files[0])
    formData.append("price", form.price.value)
    formData.append("description", form.description.value)

    console.log(body)

    const res = await fetch(`/product/newProduct/cat/1`, {
        method: 'POST',
        body: formData
    })
    if (res.ok) {
        getProducts()
    }
})
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
    try {
        const response = await fetch(`/product/showProduct`);
        const data = await response.json();
        const productArray = data.product; // Access the correct property in the response data

        const container = document.getElementById('productContainer');
        container.innerHTML = '';
        let productHTML = '';
        for (const product of productArray) {
            const productName = product.name;
            const productPrice = product.price;
            const description = product.description;
            const image = product.image;

            productHTML += 
            `<div class="productBox col-3">
            <p>${productName}</p>
            <img src="${image}" width="80%">
            <p>${description}</p>
            <p>${productPrice}</p>
            </div>`;
        }

        container.innerHTML = productHTML;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

getProducts()