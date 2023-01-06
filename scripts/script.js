const $ = document;
const mainElem = $.querySelector("main");
const cartElem = $.querySelector(".cart-tooltip");
const cartItemsCounter = $.querySelector(".cart-items-counter");
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
            ${
              !checkCartBtn(product.id)
                ? `
                <button onclick="addToCart(${product.id})" class="btn btn-primary mt-4">Add to cart</button>
                `
                : `
            <div class='mt-4'>
              <button onclick="decreaseBtn(${
                product.id
              })" class='addBtn btn btn-primary'>-</button>
              <p class='d-inline px-1'>${cartItemCounter(product.id)}</p>
              <button onclick="increaseBtn(${
                product.id
              })" class='addBtn btn btn-primary'>+</button>
            </div>`
            }
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
            <button onclick="decreaseBtn(${
              product.id
            })" class="rounded">-</button>
            <p class="d-inline text-dark">${cartItemCounter(product.id)}</p>
            <button onclick="increaseBtn(${
              product.id
            })" class="rounded">+</button>
          </div>
        </div>
      </div>
      <i onclick="removeItemCart(${
        product.id
      })" class="bi bi-trash text-danger"></i>
    </div>`;
    allCards += card;
  });
  cartElem.innerHTML += allCards;
}

function addToCart(productID) {
  let product = data.find((product) => product.id === productID);
  cart.push({ ...product, itemCount: 1 });
  cartGenerator(cart);
  totalCartItemCounter();
  productsGenerator(data);
}

function checkCartBtn(productID) {
  if (
    cart.find((product) => product.id === productID && product.itemCount > 0)
  ) {
    return true;
  }
  return false;
}

function decreaseBtn(productID) {
  let filteredCart = [...cart]
    .filter((product) =>
      product.id === productID
        ? { ...product, itemCount: product.itemCount-- }
        : product
    )
    .filter((product) => product.itemCount > 0);
  cart = [...filteredCart];
  totalCartItemCounter();
  productsGenerator(data);
}

function increaseBtn(productID) {
  let filteredCart = [...cart].filter((product) =>
    product.id === productID
      ? { ...product, itemCount: product.itemCount++ }
      : product
  );
  cart = [...filteredCart];
  totalCartItemCounter();
  productsGenerator(data);
}

function cartItemCounter(productID) {
  let productFinder = [...cart].find((product) => product.id === productID);
  return productFinder.itemCount;
}

function totalCartItemCounter() {
  let total = [...cart]
    .map((product) => product.itemCount)
    .reduce((a, b) => a + b, 0);
  cartItemsCounter.innerHTML = total;
}

function removeItemCart(productID) {
  let filteredCart = [...cart].filter((product) => product.id !== productID);
  cart = [...filteredCart];
  cartGenerator(cart);
  totalCartItemCounter();
  productsGenerator(data);
}
