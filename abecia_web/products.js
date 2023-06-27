let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.bi-x');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
  body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
});



let products = [
  {
    id: 1,
    name: 'Fisheye Panoramic Camera 360',
    image: '360-1.png',
    rating: 5,
    price: '₱2,000.00',
  },
  {
    id: 2,
    name: '2MP Dome Camera',
    image: 'dome-1.png',
    rating: 4,
    price: '₱1,500.00',
  },
  {
    id: 3,
    name: 'Turbo HD Bullet Camera',
    image: 'bullet-1.png',
    rating: 5,
    price: '₱750.00',
  },
  {
    id: 4,
    name: 'Wireless 360 CCTV',
    image: '360-2.png',
    rating: 4,
    price: '₱1,500.00',
  },
  {
    id: 5,
    name: 'Wi-Fi Mini Dome Camera',
    image: 'dome-2.png',
    rating: 5,
    price: '₱3,600.00',
  },
  {
    id: 6,
    name: 'Full Color Outdoor Bullet Camera',
    image: 'bullet-2.png',
    rating: 3,
    price: '₱1,700.00',
  },
  {
    id: 7,
    name: '1200TVL HD 30X Zoom Camera 360',
    image: '360-3.png',
    rating: 5,
    price: '₱3,588.00',
  },
  {
    id: 8,
    name: '2MP 25x Starlight HDCVI 150m IR PTZ',
    image: 'dome-3.png',
    rating: 4,
    price: '₱4,840.00',
  },
  {
    id: 9,
    name: 'HWI-B120H-DW Security CCTV Camera',
    image: 'bullet-3.png',
    rating: 5,
    price: '₱3,105.00',
  },
];
let listCards = [];

function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML = `
      <img src="img/${value.image}">
      <div class="title">${value.name}</div>
      <div class="price">${value.price}</div>
      <div class="stars">${generateStars(value.rating)}</div>
      <button onclick="addToCard(${key})">Add To Cart</button>`;
    list.appendChild(newDiv);
  });
}

function addToCard(key) {
  if (listCards[key] == null) {
    // copy product from list to list card
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  } else {
    listCards[key].quantity += 1;
  }
  reloadCard();
}

function reloadCard() {
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice += parseFloat(value.price.replace(/₱|,/g, '')) * value.quantity;
    count += value.quantity;
    if (value != null) {
      let newDiv = document.createElement('li');
      newDiv.innerHTML = `
        <div><img src="img/${value.image}"/></div>
        <div>${value.name}</div>
        <div>${value.price}</div>
        <div>
          <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
          <div class="count">${value.quantity}</div>
          <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
        </div>`;
      listCard.appendChild(newDiv);
    }
  });

  // Update the total word
  let totalText = count === 1 ? 'Subtotal' : 'Subtotal(s)';
  total.innerText = `${totalText}: ₱${numberWithCommas(totalPrice.toFixed(2))}`;
  quantity.innerText = count;

  // Update the checkout page
  checkoutList.innerHTML = '';
  listCards.forEach((value, key) => {
    if (value != null) {
      let newLi = document.createElement('li');
      newLi.innerHTML = `
        <div><img src="img/${value.image}" /></div>
        <div>${value.name}</div>
        <div>${value.price}</div>
        <div>${value.quantity}</div>`;
      checkoutList.appendChild(newLi);
    }
  });

  let subtotalText = count === 1 ? 'Subtotal' : 'Subtotal(s)';
  let subtotalPrice = numberWithCommas(totalPrice.toFixed(2));
  let subtotalDiv = document.querySelector('.subtotal');
  subtotalDiv.innerHTML = `${subtotalText}: ₱${subtotalPrice}`;
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price =
      '₱' + numberWithCommas((parseFloat(products[key].price.replace(/₱|,/g, '')) * quantity).toFixed(2));
  }
  reloadCard();
}

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function generateStars(rating) {
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += "&#9733;";
  }
  for (let i = rating; i < 5; i++) {
    stars += "&#9734;"; 
  }
  return stars;
}

initApp();

checkoutButton.addEventListener('click', () => {
  // Store the cart data in localStorage
  localStorage.setItem('cart', JSON.stringify(listCards));
  // Navigate to the checkout page
  window.location.href = 'checkout.html';
});


// let openShopping = document.querySelector('.openShopping');
// let list = document.querySelector('.list');
// let listCard = document.querySelector('.listCard');
// let body = document.querySelector('body');
// let total = document.querySelector('.total');
// let quantity = document.querySelector('.quantity');
// let checkoutButton = document.querySelector('.checkout-button');
// let checkoutList = document.querySelector('.checkout-list');

// openShopping.addEventListener('click', () => {
//   body.classList.add('active');
// });

// let products = [
//   {
//     id: 1,
//     name: 'Fisheye Panoramic Camera 360',
//     image: '360-1.png',
//     rating: 5,
//     price: '₱2,000.00',
//   },
//   {
//         id: 2,
//         name: '2MP Dome Camera',
//         image: 'dome-1.png',
//         rating: 4,
//         price: '₱1,500.00',
//       },
//       {
//         id: 3,
//         name: 'Turbo HD Bullet Camera',
//         image: 'bullet-1.png',
//         rating: 5,
//         price: '₱750.00',
//       },
//       {
//         id: 4,
//         name: 'Wireless 360 CCTV',
//         image: '360-2.png',
//         rating: 4,
//         price: '₱1,500.00',
//       },
//       {
//         id: 5,
//         name: 'Wi-Fi Mini Dome Camera',
//         image: 'dome-2.png',
//         rating: 5,
//         price: '₱3,600.00',
//       },
//       {
//         id: 6,
//         name: 'Full Color Outdoor Bullet Camera',
//         image: 'bullet-2.png',
//         rating: 3,
//         price: '₱1,700.00',
//       },
//       {
//         id: 7,
//         name: '1200TVL HD 30X Zoom Camera 360',
//         image: '360-3.png',
//         rating: 5,
//         price: '₱3,588.00',
//       },
//       {
//         id: 8,
//         name: '2MP 25x Starlight HDCVI 150m IR PTZ',
//         image: 'dome-3.png',
//         rating: 4,
//         price: '₱4,840.00',
//       },
//       {
//         id: 9,
//         name: 'HWI-B120H-DW Security CCTV Camera',
//         image: 'bullet-3.png',
//         rating: 5,
//         price: '₱3,105.00',
//       },
// ];

// let listCards = [];

