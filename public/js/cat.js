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

 