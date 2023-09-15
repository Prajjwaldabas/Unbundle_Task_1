import { getCartFromLocalStorage,updateCartInLocalStorage } from "./cart.js";


// Function to fetch and display products in the custom pack modal
document.addEventListener('DOMContentLoaded', function () {
    function displayCustomPackModal() {
      // Fetch the chocolates data from chocolates.json
      fetch('chocolates.json')
        .then(response => response.json())
        .then(data => {
          const productList = document.getElementById('product-list');
  
          // Clear any existing items
          productList.innerHTML = '';
  
          // Iterate through the products and create list items
          data.forEach(item => {
            const { name, desc, price, image, id } = item;
            const card = document.createElement('div');
            card.classList.add('card', 'modalCard');
            card.setAttribute("data-item-id", `${id}`);
  
            card.addEventListener('click', () => {
              card.classList.toggle('active'); // Toggle selection style
  
            
              const itemId = JSON.parse(card.getAttribute('data-item-id'));
  
              
          
              const isSelected = card.classList.contains('active');


           
const itemData = data.find(item => item.id === itemId);

itemData.quantity = 1;
console.log(itemData)
if (itemData) {
  if (isSelected) {
    // Add the item to the selected items array
    selectedItems.push(itemData);

    // Update the total sum
    totalSum += itemData.price;
  } else {
    // Remove the item from the selected items array
    const index = selectedItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
      selectedItems.splice(index, 1);

      // Update the total sum
      totalSum -= itemData.price;
    }
  }
}
  
              // Update the item count
              const itemCount = selectedItems.length;
  
              // Update the total sum and item count in the modal
              document.getElementById('total-sum-modal').textContent = totalSum + ' Rs';
              document.getElementById('item-count-modal').textContent = itemCount;
            });
  
            if (productList) {
              card.innerHTML = `
                <img src=${image} class="card-img-top" id="cardImg" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${name}</h5>
                  <p class="card-text text-secondary fs-10 ">${desc}</p>
  
                  <div class="d-flex flex-column mb-3">
                    <p class="card-text fw-bold fs-6">${price} Rs</p>
                    <button href="#" class="btn btn-secondary addToPack add-to-cart" data-item-id="${id}">Add to Pack</button>
                  </div>
                </div>
              `;
  
              productList.appendChild(card);
            }
          });
        })
        .catch(error => {
          console.error('Error fetching chocolates data:', error);
        });
    }
  
    // Call the function to display products when the modal is shown
    $('#customPackModal').on('shown.bs.modal', function () {
      displayCustomPackModal();
    });
   

    const selectedItems = [];
         let totalSum = 0;
  
    // Add an event listener to the "Create" button
    document.getElementById('create-custom-pack-button').addEventListener('click', function () {
         // Initialize the selected items array and total sum
   
        
      if (selectedItems.length === 0) {
        // No items are selected, display the alert
        alert('Please select at least one item for the Custom Pack.');
      } else if (selectedItems.length > 8) {
        // More than 8 items are selected, display an error message
        alert('Maximum 8 items allowed in the custom pack.');
      } else {
        // Items are selected and within the limit, proceed with creating the custom pack
       
  
        // hide the modal
        $('#customPackModal').modal('hide');
  
        // Add the selected items to the local storage cart array
        const cart = getCartFromLocalStorage();
        selectedItems.forEach(item => {
          cart.push(item);
        });
  
        // Update the cart data in local storage
        updateCartInLocalStorage(cart); 
      

        // Navigate to cart.html
window.location.href = 'cart.html';
      }
    });
  });
  