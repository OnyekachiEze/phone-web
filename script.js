const firstNav = document.querySelector('.first-nav');
firstNav.addEventListener('mouseover', () => {
    firstNav.style.backgroundColor = '#232f3f';
});
firstNav.addEventListener('mouseout', () => {
    firstNav.style.backgroundColor = '#1c2a3b';
});



// Search area

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search input');
    const searchPlaceholder = document.querySelector('.search p');

    searchPlaceholder.addEventListener('click', function () {
        searchInput.focus();
    });

    searchInput.addEventListener('input', function () {
        if (searchInput.value.trim() === '') {
            searchPlaceholder.style.display = 'block';
        } else {
            searchPlaceholder.style.display = 'none';
        }
    });
});









document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.toggle');
    const navCollaps = document.querySelector('.navcollaps');

    toggleBtn.addEventListener('click', function () {
        navCollaps.classList.toggle('show');
    });
});





const style = document.createElement('style');
style.innerHTML = `
    .shipping {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 20px;
        background-color: #f0f0f0;
        border: 2px solid #ccc;
    }

    .ship1 {
        text-align: center;
        margin: 10px;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        flex-basis: 20%; /* Adjust based on the number of items */
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Add transition effect */
    }

    .ship1:hover {
        transform: scale(1.1); /* Scale up on hover */
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); /* Add box shadow on hover */
    }

    .ship1 a {
        text-decoration: none;
        color: #333;
        display: block;
        padding: 10px;
        border-radius: 6px;
        transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out; /* Add transition effects */
    }

    .ship1 a:hover {
        background-color: #e5e5e5; /* Change background color on hover */
        color: #555; /* Change text color on hover */
    }

    .ship1 i {
        font-size: 30px;
        margin-bottom: 10px;
        transition: transform 0.3s ease-in-out; /* Add transition effect to icons */
    }

    .ship1:hover i {
        transform: rotate(360deg); /* Rotate icon on hover */
    }

    .ship1 h3 {
        font-size: 18px;
        margin-bottom: 5px;
        color: #009688; /* Green color for heading */
    }

    .ship1 p {
        font-size: 14px;
        color: #777;
    }

    /* Specific background colors for each item */
    .ship1:nth-child(1) {
        background-color: #ffc107; /* Yellow */
    }

    .ship1:nth-child(2) {
        background-color: #03a9f4; /* Blue */
    }

    .ship1:nth-child(3) {
        background-color: #e91e63; /* Pink */
    }

    .ship1:nth-child(4) {
        background-color: #9c27b0; /* Purple */
    }

    /* Responsive styles */
    @media (max-width: 768px) {
        .shipping {
            flex-wrap: wrap;
            justify-content: center;
        }

        .ship1 {
            flex-basis: 45%; /* Adjust based on screen size */
        }
    }
`;
document.head.appendChild(style);




function updateTimer(timerId, days, hours) {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);
    endDate.setHours(endDate.getHours() + hours);

    const timerDisplay = document.getElementById(timerId);

    setInterval(function() {
        const now = new Date();
        const difference = endDate - now;

        const daysRemaining = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hoursRemaining = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesRemaining = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const secondsRemaining = Math.floor((difference % (1000 * 60)) / 1000);

        timerDisplay.textContent = `${daysRemaining} days ${hoursRemaining} hours ${minutesRemaining} minutes ${secondsRemaining} seconds`;
    }, 1000);
}

// Call updateTimer function for each timer element
updateTimer('safeTimerDisplay1', 30, 6);






//  For cart
const cards = document.querySelectorAll('.card');
const cart = document.getElementById('cart');
const totalElement = document.getElementById('total');
const selectedItems = {};

function handleCardClick(event) {
  const card = event.currentTarget;
  const itemId = card.id;
  const itemName = card.querySelector('h2').textContent;
  const itemPrice = parseFloat(card.querySelector('.price').textContent);

  if (selectedItems[itemId]) {
    selectedItems[itemId].count++;
  } else {
    selectedItems[itemId] = {
      name: itemName,
      price: itemPrice,
      count: 1,
    };
  }

  updateCart();
}

function updateCart() {
  cart.innerHTML = '';
  let total = 0;

  for (const itemId in selectedItems) {
    const item = selectedItems[itemId];
    const listItem = document.createElement('li');
    const quantityContainer = document.createElement('div');
    const quantityText = document.createElement('span');
    const addButton = document.createElement('button');
    const subtractButton = document.createElement('button');

    addButton.textContent = '+';
    subtractButton.textContent = '-';

    quantityText.textContent = item.count;

    addButton.addEventListener('click', () => {
      addItem(itemId);
    });

    subtractButton.addEventListener('click', () => {
      removeItem(itemId);
    });

    const hr = document.createElement('hr');

    quantityContainer.appendChild(subtractButton);
    quantityContainer.appendChild(quantityText);
    quantityContainer.appendChild(addButton);
    quantityContainer.appendChild(hr);

    listItem.textContent = `${item.name} - $${item.price * item.count}`;
    listItem.appendChild(quantityContainer);
    cart.appendChild(listItem);

    total += item.price * item.count;
  }

  totalElement.textContent = `Total Amount: $${total.toFixed(2)}`;
}

function addItem(itemId) {
  if (selectedItems[itemId]) {
    selectedItems[itemId].count++;
  }
  updateCart();
}

function removeItem(itemId) {
  if (selectedItems[itemId]) {
    selectedItems[itemId].count--;
    if (selectedItems[itemId].count <= 0) {
      delete selectedItems[itemId];
    }
  }
  updateCart();
}

cards.forEach((card) => {
  card.addEventListener('click', handleCardClick);
});