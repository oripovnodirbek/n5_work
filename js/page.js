const wrapper = document.getElementById("wrapper");

async function getDate(url) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    return error;
  }
}

function createPage(product) {
  return `
    <nav class="page_bloc">
    <div class="page_imag">
        <img src="${product.image}" alt="">
    </div>
    <div class="page_text">
        <h2>
            ${product.name}
        </h2>
        <p> Ex dignissimos expedita sint ducimus! Qui fugit quibusdam ea aperiam velit deleniti vel, repellendus, quod tenetur ut omnis. Commodi labore aut quod nesciunt fugit maxime quo eaque dolorem quia molestiae, eligendi </p>
        <p class="narx">Цена</p>
        <div class="page_sena">
              <h3>${product.newPrice}₽</h3>
              <p>${product.oldPrice}₽</p>
         </div>
            <button id="button" data-id="${product.id}">Корзинка</button>
        </div>
    </nav>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
  let url = window.location.href;
  const id = url.split("id=")[1];

  if (!id) {
    window.location.assign("http://127.0.0.1:5500/index.html");
    return;
  }

  getDate(`https://cars-pagination.onrender.com/products/${id}`)
    .then((data) => {
      if (data.id) {
        const card = createPage(data);
        wrapper.innerHTML = card;

        const btn = document.getElementById("button");
        btn.addEventListener("click", function() {
          let products = JSON.parse(localStorage.getItem("products")) || [];

          if (!products.includes(data.id)) {
            products.push(data.id);
          }

          localStorage.setItem("products", JSON.stringify(products));
          window.location.href = `http://127.0.0.1:5500/pages/card.html?id=${data.id}`;
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
