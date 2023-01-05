const $ = document;
const mainElem = $.querySelector("main");
const cartElem = $.querySelector(".cart-tooltip");
let cart = [];
let data = [];

async function getAllProducts() {
  const response = await fetch("https://dummyjson.com/products");
  const products = await response.json();

  return products;
}

getAllProducts()
  .then((products) => {
    data = [...products.products];
    productsGenerator(data);
  })
  .catch((error) => console.log(error));

function productsGenerator(products) {
  cartGenerator(cart);
  let allCards = "";
  products.forEach((product) => {
    const card = `
    <div class="card" >
        <img
        src='${product.images[0]}'
        alt='${product.title}'
        class="card-img-top"
        />
        <div class="card-body">
            <h6 class="card-title title m-0">${product.title}</h6>

            <button onclick="addToCart(${product.id})" class="btn btn-primary mt-4">Add to cart</button>
        </div>
    </div>`;
    allCards += card;
  });
  mainElem.innerHTML = allCards;
}

function cartGenerator(products) {
  cartElem.innerHTML = "";
  let allCards = "";
  products.forEach((product) => {
    const card = `
    <div class="item d-flex justify-content-around align-items-center py-2 py-1 border-bottom">
      <div class="d-flex">
        <div class="d-flex justify-content-center align-self-center">
          <img
            class="rounded"
            src='${product.images[0]}'
            alt='${product.title}'
          />
        </div>
        <div class="ms-3">
          <p class="item-title m-0 text-dark">${product.title}</p>
          <div>
            <button class="rounded">-</button>
            <p class="d-inline text-dark">1</p>
            <button class="rounded">+</button>
          </div>
        </div>
      </div>
      <i class="bi bi-trash text-danger"></i>
    </div>`;
    allCards += card;
  });
  cartElem.innerHTML += allCards;
}

function addToCart(productID) {
  let product = data.find((product) => product.id === productID);
  cart.push(product);
  cartGenerator(cart);
}
// <div class='mt-4'>
// <button class='addBtn btn btn-primary'>-</button>
// <p class='d-inline px-1'>1</p>
// <button class='addBtn btn btn-primary'>+</button>
// </div>
