



// Import functions from cart.js
import { addToCart, removeItemFromCart, displayCartItems } from './cart.js';

const chocolates_url = "chocolates.json";
const cardContainer = document.getElementById('cardConatiner');

// Fetch chocolates data and create cards
fetch(chocolates_url)
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const { name, desc, price, image, id } = item;
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute("data-item-id", `${id}`);
      if (cardContainer) {
        card.innerHTML = `
          <img src=${image} class="card-img-top" id="cardImg" alt="...">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text text-secondary">${desc}</p>
            <p class="card-text fw-bold">${price} Rs</p>
            <button href="#" class="btn btn-secondary add-to-cart" data-item-id="${id}">Add to Cart</button>
          </div>
        `;
        cardContainer.appendChild(card);
      }
    });
  });

// Display cart items on page load
displayCartItems();




// Add a click event listener to "Add to Cart" buttons
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('add-to-cart')) {
    const productId = event.target.getAttribute('data-item-id');
    addToCart(productId);
  }
});


// Add a click event listener to "remove from Cart" buttons
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('remove')) {
    const itemId = event.target.getAttribute('data-item-id');
    removeItemFromCart(itemId);
  }
});



// Rest of your code for event listeners, total sum calculation, etc.
// ...















































// // const chocolates_url = "chocolates.json";
// // const cardContainer = document.getElementById('cardConatiner');
// const cartTable = document.getElementById('cart-items');
// let totalSum = 0;

// // Function to get the cart from local storage
// function getCartFromLocalStorage() {
//   const cartJSON = localStorage.getItem('cart');
//   return JSON.parse(cartJSON) || [];
// }

// // Function to update the cart in local storage
// function updateCartInLocalStorage(cart) {
//   localStorage.setItem('cart', JSON.stringify(cart));
// }

// // Function to add a product to the cart
// function addToCart(productId) {
//   // Get the cart from local storage
//   const cart = getCartFromLocalStorage();

//   // Find the product in the cart (if it exists)
//   const existingProduct = cart.find(item => {
//     // console.log(item.id.toString() === productId)
//    return item.id.toString() === productId});
   

//   if (existingProduct) {
   
    
//     // If the product is already in the cart, increase the quantity
// console.log("product already added")

    
//   } else {
//     // If the product is not in the cart, add it with a quantity of 1 and include product details
//     getProductDetails(productId)
//       .then(productDetails => {
//         if (productDetails) {
//           const product = {
//             id: productId,
//             quantity: 1,
//             ...productDetails,
//           };
//           cart.push(product);

//           // Update the cart in local storage
//           updateCartInLocalStorage(cart);
//           totalSum += product.price;
//           displayCartItems(); // Update the displayed cart items
//         }
//       });
//   }
// }
// // function to remove item from the cart

// function removeItemFromCart(itemId) {
//   // Get the cart data from local storage
//   const cart = getCartFromLocalStorage();

//   // Find the index of the item to be removed
//   const itemIndex = cart.findIndex(item => item.id.toString() === itemId);

//   if (itemIndex !== -1) {
//     // If the item is found, get a reference to it
//     const removedItem = cart[itemIndex];

//     // Calculate the price of the removed item
//     const removedItemTotalPrice = removedItem.price * removedItem.quantity;

//     // Update the totalSum by subtracting the price of the removed item
//     totalSum -= removedItemTotalPrice;

//     // Remove the item from the cart array
//     cart.splice(itemIndex, 1);

//     // Update the cart data in local storage
//     updateCartInLocalStorage(cart);

//     // Refresh the cart display
//     displayCartItems();
//   }
// }



// // Function to fetch product details based on product ID
// function getProductDetails(productId) {
//   // console.log(productId)
//   return fetch(chocolates_url)
//     .then(response => response.json())
//     .then(data => {
//       // console.log(data)
//       const product = data.find(item => {
        
       
       
       
//         return item.id.toString() === productId; // Include a return statement
      
//       });
      
//       // console.log(product);
//       return product;
//     })
//     .catch(error => {
//       console.error('Error fetching product details:', error);
//       return null;
//     });
// }


// // Function to display cart items in a table format
// function displayCartItems() {
//   const cart = getCartFromLocalStorage();

//   // console.log(cart)
//   // Clear the previous table rows
//   if (cartTable) {
//     cartTable.innerHTML = '';

//     cart.forEach((item, index) => {
//       // console.log(item)
//       const row = cartTable.insertRow(index);
//       row.innerHTML = `
//       <td class="d-flex gap-5 align-items-center "><img src="${item.image}" alt="${item.name}" width="120">
//       <div>
//       <p class="fw-bold mt-5 "> ${item.name}</p>
//      <p> ${item.price} Rs</p>
//      <p class="mb-5"> ${item.desc}</p>

//       <div/>
    

//       </td>

//       <td class="text-center align-middle"> 
      
      
//       <button class="qtyBtn"  data-action="decrease" data-item-id="${item.id}">-</button>${item.quantity}<button class="qtyBtn"  data-action="increase" data-item-id="${item.id}">+</button>
      
      
//       </td>
//         <td class=" text-center align-middle" data-item-id="${item.id}"> <button class="delete" ><i class="fa-regular fa-trash-can remove"  data-item-id="${item.id}" ></i></button
//          </td>
      
//         <td class="text-center subtotal align-middle" data-item-id="${item.id}">${(item.price * item.quantity)} Rs</td>
        
//       `;


    
//     });


//     let totalSum = calculateTotalSum(cart);

//     // Update the total sum in the span element
//     const totalSumSpan = document.getElementById('total-sum');
//     if (totalSumSpan) {
//       totalSumSpan.textContent = totalSum + ' Rs';
//     }
    
//   }



// }

// // Add a click event listener to the cart table for quantity adjustment
// cartTable.addEventListener('click', function (event) {
//   if (event.target.classList.contains('qtyBtn')) {
//     const action = event.target.getAttribute('data-action');
//     const itemId = event.target.getAttribute('data-item-id');

//     // Get the cart data from local storage
//     const cart = getCartFromLocalStorage();

//     // Find the item in the cart
//     const cartItem = cart.find(item => item.id.toString() === itemId);

//     if (cartItem) {
//       // Increase or decrease the quantity based on the action
//       if (action === 'increase') {
//         cartItem.quantity++;
//       } else if (action === 'decrease' && cartItem.quantity > 1) {
//         cartItem.quantity--;
//       }

//       // Update the subtotal for the item
//       const subtotalCell = document.querySelector(`.subtotal[data-item-id="${itemId}"]`);
//       if (subtotalCell) {
//         subtotalCell.textContent = `${(cartItem.price * cartItem.quantity)} Rs`;
//       }

//       // Update the cart data in local storage
//       updateCartInLocalStorage(cart);

//       // Refresh the cart display
//       displayCartItems();
//     }
//   }
// });





// // function to calculate total price of cart items

// function calculateTotalSum(cart) {
//   // Calculate the total sum of prices in the cart
//   let totalSum = 0;
//   cart.forEach(item => {
//     totalSum += item.price * item.quantity;
//   });
//   return totalSum;
// }


// // Add a click event listener to "Add to Cart" buttons
// document.addEventListener('click', function (event) {

//   if (event.target.classList.contains('remove')) {
//     const itemId = event.target.getAttribute('data-item-id');
//     // console.log(itemId)
//     removeItemFromCart(itemId);
//   }
// });






// // Add a click event listener to "Add to Cart" buttons
// document.addEventListener('click', function (event) {
//   if (event.target.classList.contains('add-to-cart')) {
//     const productId = event.target.getAttribute('data-item-id');
//     addToCart(productId);
//   }
// });

// // Fetch chocolates data and create cards
// fetch(chocolates_url)
//   .then(response => response.json())
//   .then(data => {
//     data.forEach(item => {
//       const { name, desc, price, image, id } = item;
//       const card = document.createElement('div');
//       card.classList.add('card');
//       card.setAttribute("data-item-id", `${id}`);
//       if (cardContainer) {
//         card.innerHTML = `
//           <img src=${image} class="card-img-top" id="cardImg" alt="...">
//           <div class="card-body">
//             <h5 class="card-title">${name}</h5>
//             <p class="card-text text-secondary">${desc}</p>
//             <p class="card-text fw-bold">${price} Rs</p>
//             <button href="#" class="btn btn-secondary add-to-cart" data-item-id="${id}">Add to Pack</button>
//           </div>
//         `;
//         cardContainer.appendChild(card);
//       }
//     });
//   });

// // Display cart items on page load
// displayCartItems();
