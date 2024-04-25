// async function singleProducts() {
//     const container = document.getElementById('detailProductContainer');
  
//     try {
//       const response = await fetch('/customer/details');
//       const data = await response.json();
  
//       data.forEach(product => {
//         const productElement = document.createElement('div');
//         productElement.innerHTML = `
//             <h3>${product.name}</h3>
//             <p>Price: $${product.price}</p>
//             <p>Description: ${product.description}</p>
//           `;
//         container.appendChild(productElement);
//       });
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
//   singleProducts()