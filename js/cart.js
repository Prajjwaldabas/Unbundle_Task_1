


const chocolates_url = "chocolates.json";
const cardContainer = document.getElementById('cardConatiner');
const cartTable = document.getElementById('cart-items');
let totalSum = 0;

// Function to get the cart from local storage
export function getCartFromLocalStorage() {
  const cartJSON = localStorage.getItem('cart');
  return JSON.parse(cartJSON) || [];
}

// Function to update the cart in local storage
export function updateCartInLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add a product to the cart
export function addToCart(productId) {
  const cart = getCartFromLocalStorage();
  const existingProduct = cart.find(item => item.id.toString() === productId);

  if (existingProduct) {
    console.log("Product already added to cart.");
  } else {
    getProductDetails(productId)
      .then(productDetails => {
        if (productDetails) {
          const product = {
            id: productId,
            quantity: 1,
            ...productDetails,
          };
          cart.push(product);
          updateCartInLocalStorage(cart);
          totalSum += product.price;
          displayCartItems();
        }
      });
  }
}

// Function to remove an item from the cart
export function removeItemFromCart(itemId) {
  const cart = getCartFromLocalStorage();
  const itemIndex = cart.findIndex(item => item.id.toString() === itemId);

  if (itemIndex !== -1) {
    const removedItem = cart[itemIndex];
    const removedItemTotalPrice = removedItem.price * removedItem.quantity;
    totalSum -= removedItemTotalPrice;
    cart.splice(itemIndex, 1);
    updateCartInLocalStorage(cart);
    displayCartItems();
  }
}



// Function to fetch product details based on product ID
export function getProductDetails(productId) {
  return fetch(chocolates_url)
    .then(response => response.json())
    .then(data => {
      const product = data.find(item => item.id.toString() === productId);
      return product;
    })
    .catch(error => {
      console.error('Error fetching product details:', error);
      return null;
    });
}

// Function to display cart items in a table format
export function displayCartItems() {
  const cart = getCartFromLocalStorage();

  if (cartTable) {
    cartTable.innerHTML = '';

    cart.forEach((item, index) => {
      const row = cartTable.insertRow(index);
      row.innerHTML = `
        <td class="d-flex gap-5 align-items-center ">
          <img src="${item.image}" alt="${item.name}" width="120">
          <div>
            <p class="fw-bold mt-5">${item.name}</p>
            <p>${item.price} Rs</p>
            <p class="mb-5">${item.desc}</p>
          </div>
        </td>

        <td class="text-center align-middle">
          <button class="qtyBtn" data-action="decrease" data-item-id="${item.id}">-</button>
          ${item.quantity}
          <button class="qtyBtn" data-action="increase" data-item-id="${item.id}">+</button>
        </td>

        <td class="text-center align-middle" data-item-id="${item.id}">
          <button class="delete">
            <i class="fa-regular fa-trash-can remove" data-item-id="${item.id}"></i>
          </button>
        </td>

        <td class="text-center subtotal align-middle" data-item-id="${item.id}">
          ${(item.price * item.quantity)} Rs
        </td>
      `;
    });

    let totalSum = calculateTotalSum(cart);

    const totalSumSpan = document.getElementById('total-sum');
    if (totalSumSpan) {
      totalSumSpan.textContent = totalSum + ' Rs';
    }
  }
}

// Function to calculate the total price of cart items
export function calculateTotalSum(cart) {
  let totalSum = 0;
  cart.forEach(item => {
    totalSum += item.price * item.quantity;
  });
  return totalSum;
}

document.addEventListener('DOMContentLoaded', function () {
    // Add a click event listener to "Add to Cart" buttons
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('remove')) {
        const itemId = event.target.getAttribute('data-item-id');
        removeItemFromCart(itemId);
      }
    });
  
    // Add a click event listener to the cart table for quantity adjustment
    const cartTable = document.getElementById('cart-items');
    if (cartTable) {
      cartTable.addEventListener('click', function (event) {
        if (event.target.classList.contains('qtyBtn')) {
          const action = event.target.getAttribute('data-action');
          const itemId = event.target.getAttribute('data-item-id');
  
          const cart = getCartFromLocalStorage();
          const cartItem = cart.find(item => item.id.toString() === itemId);
  
          if (cartItem) {
            if (action === 'increase') {
              cartItem.quantity++;
            } else if (action === 'decrease' && cartItem.quantity > 1) {
              cartItem.quantity--;
            }
  
            const subtotalCell = document.querySelector(`.subtotal[data-item-id="${itemId}"]`);
            if (subtotalCell) {
              subtotalCell.textContent = `${(cartItem.price * cartItem.quantity)} Rs`;
            }
  
            updateCartInLocalStorage(cart);
            displayCartItems();
          }
        }
      });
    }
  });
  