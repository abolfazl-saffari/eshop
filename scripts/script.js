const $ = document;
const mainElem = $.querySelector("main");
let data = [];

async function getAllProducts() {
  const response = await fetch("https://dummyjson.com/products");
  const products = await response.json();

  return products;
}

getAllProducts().then((products) => {
  data = [...products.products];
  productsGenerator(data);
});

function productsGenerator(products) {
  console.log(products);
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
            <a  target=”_blank” class="btn btn-primary mt-4">Add to cart</a>
        </div>
    </div>`;
    allCards += card;
  });
  mainElem.innerHTML = allCards;
}
