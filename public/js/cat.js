const createCat = document.querySelector('#catForm').addEventListener('submit', async function (event) {
    event.preventDefault()

    const form = event.target
    const formObject = {
        category: form.category.value
    }

    const res = await fetch('/cat',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formObject)
    })
  })

  async function getCategories() {
    try {
      const response = await fetch('/cat/showCat');
      const data = await response.json();
      const catArray = data.data.cat;

      // 在這裡處理取得的類別資料陣列
      const container = document.getElementById('catContainer');
      for (const cat of catArray) {
        const catName = cat.name;
        const catLink = `/product.html?cat=${cat.id}`
        // const catLink = "/manageProduct/showProduct/cat/1"
        const catElement = document.createElement('p');
        const catAnchor = document.createElement('a');
        catAnchor.textContent = catName;
        catAnchor.href = catLink;

        catElement.textContent = catName;
        catElement.appendChild(catAnchor);
        container.appendChild(catElement);
      }
    } catch (error) {
      // 處理錯誤
      console.error('Error:', error);
      throw error;
    }
  }
  getCategories()