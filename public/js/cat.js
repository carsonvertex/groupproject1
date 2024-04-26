const createCat = document.querySelector('#catForm').addEventListener('submit', async function (event) {
  event.preventDefault()

  const form = event.target

  const formObject = {
    category: form.name.value
  }
  console.log(formObject)

  const res = await fetch('/cat/newCat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObject)
  })
  if (res.ok) {
    getCategories()
  }
})
//admin page show categories
async function getCategories() {
  try {
    const response = await fetch('/cat/showCat');
    const data = await response.json();
    const catArray = data.cat;

    // 在這裡處理取得的類別資料陣列
    const container = document.getElementById('catContainer');
    container.innerHTML = ""
    let catHTML = '';
    for (const cat of catArray) {
      const id = cat.id
      const catName = cat.name;
      const catLink = `/product.html?cat=${cat.id}`; //query用戶?cat=
      // button

      catHTML += `
      <div  class="col-md-6 col-lg-3 my-4" >
         <div class="cardElement hoverDiv fingerPointer" onclick="window.location.href = '${catLink}'">
           <h5>${catName}</h5>
           <p>Category ID: ${id}</p>
         </div>
       </div>`;
      // catHTML += `<div class="catBox"><a href="${catLink}">${catName}</a></div>`;
      
    }
    
    container.innerHTML = catHTML;
  } catch (error) {
    // 處理錯誤
    console.error('Error:', error);
    throw error;
  }
}
getCategories()