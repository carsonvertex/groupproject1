
// .querySelector 未有按購買位置
const createProduct = document.querySelector('.productArea-B').addEventListener('buybutton', async function (event) {
    event.preventDefault()

    const form = event.target
    const body = form

    const formData = new FormData()
    formData.append("image", form.image.files[0])
    formData.append("name", form.name.value)
    formData.append("price", form.price.value)
    formData.append("description", form.description.value)

    console.log(body)

// 條path 未有
    const res = await fetch(`/shopping_cart/showShoppinglist`, {
        method: 'POST',
        body: formData
    })
    if (res.ok) {
        buyitemlist()
    }
})


async function buyitemlist() {
    const urlParams = new URLSearchParams(window.location.search);
    // ('') 未有輸入既位於
    // const id = urlParams.get('');
    try {
        const response = await fetch(`/shopping_cart/newShoppinglist`);
        const data = await response.json();
        const productArray = data.product; // Access the correct property in the response data

        const container = document.getElementById('buyItemsContainer');
        container.innerHTML = '';
        let shopHTML = '';
        for (const product of productArray) {
            const productId = product.id
            const image = product.image;
            const productName = product.name;
            const productPrice = product.price;
            

            shopHTML +=
            `<div class="productArea-A">
            <img width=100% height=100% src="${image}">
        </div>
        <div class="productArea-B">
            <p>${productName}</p>
            <p>${description}</p>
            <p>${productPrice}</p>
        </div>
            `;
        }
        container.innerHTML = shopHTML;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

buyitemlist()