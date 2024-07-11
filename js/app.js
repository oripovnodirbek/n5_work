const page = document.getElementsByClassName('page');
const pages = document.getElementById('pages');

const minPrice = document.querySelector(".minPrice");
const maxPrice = document.querySelector(".maxPrice");

const shoppingButton = document.querySelector(".shoppingpage");

console.log(shoppingButton);

async function getDate(url) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    return error;
  }
}

function createCard(product) {
  return `
    <div class="page" data-id='${product.id}'>
      <div class="page_header">
        <p>${product.name}</p>
        <button class="page_but">SALE</button>
      </div>
      <img src="${product.image}" alt="imglar" class="imag">
      <button class="podarok"><i class="fa-solid fa-gift"></i> Подарок</button>
      <div class="reyting">
        <img src="./images/рейтинг.png" alt="reyting">
        <p>(12) отзывов</p>
      </div>
      <p class="page_text">Вариативный замок Golden Soft для отеля</p>
      <div class="narx">
        <h3>${product.newPrice}₽</h3>
        <h4>${product.oldPrice}₽</h4>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', function() {
  let productsData = [];

  getDate('https://cars-pagination.onrender.com/products')
    .then((data) => {
      productsData = data;
      displayFilteredProducts(productsData);

      minPrice.addEventListener('input', () => filterAndDisplayProducts(productsData));
      maxPrice.addEventListener('input', () => filterAndDisplayProducts(productsData));
    })
    .catch((err) => {
      console.log(err);
    });

  shoppingButton.addEventListener('click', function() {
    window.location.assign(`http://127.0.0.1:5500/pages/card.html`);
  });
});

function filterAndDisplayProducts(products) {
  const min = parseFloat(minPrice.value) || 0;
  const max = parseFloat(maxPrice.value) || Infinity;

  const filteredProducts = products.filter(product => product.newPrice >= min && product.newPrice <= max);
  displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(products) {
  pages.innerHTML = '';
  products.forEach((product, index) => {
    if (index <= 12) {
      let card = createCard(product);
      pages.innerHTML += card;
    }
  });

  const cards = document.querySelectorAll('.page');
  cards.forEach(function(card) {
    card.addEventListener('click', function(event) {
      const cardId = this.getAttribute('data-id');
      if (cardId) {
        window.location.assign(`http://127.0.0.1:5500/pages/page.html?id=${cardId}`);
      }
    });
  });
}
