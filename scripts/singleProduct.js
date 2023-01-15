const $ = document;
const productId = window.location.search.split("=")[1];
const mainElem = $.querySelector("main");
const pageHrefElem = $.querySelector(".pageHref");
const productImg = $.querySelector(".product-img");
const productDetailTitleElem = $.querySelector(".product-detail-title");
const productDetailDescriptionElem = $.querySelector(
  ".product-detail-description"
);

async function getAllProducts() {
  const response = await fetch(`https://dummyjson.com/products/${productId}`);
  const products = await response.json();

  return products;
}

getAllProducts()
  .then((product) => {
    console.log(product);
    singleProductGenerator(product);
  })
  .catch((error) => console.log(error));

function singleProductGenerator(product) {
  $.title = product.title;
  pageHrefElem.setAttribute("href", `singlePage.html?productId=${productId}`);
  pageHrefElem.innerHTML = product.title;
  productDetailTitleElem.innerHTML = product.title;
  productDetailDescriptionElem.innerHTML = product.description;
  productImg.setAttribute("src", product.images[0]);
}
