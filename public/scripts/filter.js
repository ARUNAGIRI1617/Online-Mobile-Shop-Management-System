const priceRangeElement = document.getElementById("price");

const filterPriceSpanElement = document.querySelector("#filter-price span");

const labelElements = document.querySelectorAll('#brands label');

const brandElements = document.querySelectorAll('.brand');

function getPriceRange() {
  filterPriceSpanElement.textContent = priceRangeElement.value;
  filterPriceSpanElement.classList.add('filter_color')
}

function brandName(event) {
  const brand =  event.target;
  
  const labelElement = brand.parentElement.children[1];
  labelElement.classList.toggle('filter_color');

}

priceRangeElement.addEventListener("input", getPriceRange);

for ( const brandElement of brandElements) {
  brandElement.addEventListener("click" , brandName )
}