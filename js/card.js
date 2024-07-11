let wrapper = document.querySelector(".card_poz");

async function getDate(url) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
}

function createCartCard(product) {
  return `
    <div class="card" data-id="${product.id}">
      <div class="card_header">
        <h3>Корзина</h3>
        <button class="card_x"><i class="fa-solid fa-xmark fa-lg"></i></button>
      </div>
      <div class="y"></div>
      <div class="card_bloc">
        <img src="${product.image}" alt="">
        <div class="podarok">
          <h4>${product.name}</h4>
          <p>+ Подарок: <span>“Приложение к замкам Golden Service”</span></p>
          <div class="son">
            <p>${product.star} dona</p>
            <p>${product.oldPrice} ₽</p>
          </div>
        </div>
        <div class="card_bloc_child">
          <button class="delete" data-id="${product.id}"><i class="fa-regular fa-trash-can"></i> Удалить</button>
        </div>
      </div>
      <div class="card_footer">
        <div>
          <div class="itogo">
            <p>Итого:</p>
            <h3>${product.newPrice} ₽</h3>
          </div>
          <button class="ofor">Оформить заказ</button>
        </div>
        <button class="prod">Продолжить покупки</button>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', function() {
  getDate('https://cars-pagination.onrender.com/products')
    .then((data) => {
      const storedProductIds = JSON.parse(localStorage.getItem("products")) || [];
      const filteredProducts = data.filter(product => storedProductIds.includes(product.id));

      filteredProducts.forEach(product => {
        const card = createCartCard(product);
        wrapper.innerHTML += card;
      });

      document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', function() {
          const productId = this.getAttribute('data-id');

          // Remove from UI
          const card = document.querySelector(`.card[data-id="${productId}"]`);
          if (card) {
            card.remove();
          }

          // Remove from localStorage
          let products = JSON.parse(localStorage.getItem("products")) || [];
          products = products.filter(id => id !== productId);
          localStorage.setItem("products", JSON.stringify(products));
        });
      });
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
});
