let data, ourData;
fetch("data.json")
  .then((response) => response.json())
  .then((fetchData) => {
    data = fetchData;
    console.log(data);
    buildPlace(data, 4, aside);
    ourData = {
      brands: fetchData.brands.filter((element) => {
        return element.date ? element : "";
      }),
    };
    console.log(ourData);
    buildPlace(ourData, 3, salesContainer);
  })
  .catch((error) => {
    console.error("Ошибка загрузки:", error);
  });

{
  /* <div class="card">
                        <img src="" alt="" class="card_img">
                        <span class="card_brand"></span>
                        <span class="card_name"></span>
                        <div class="card_sale">
                            <span class="card_sale_text">Скидки</span>
                            <div class="card_sale__cashback"></div>
                            <div class="card_sale__cashback-percent"></div>
                        </div>
                        <span class="card_subtitle"> </span>
                    </div> */
}
console.log("work!!!!!!!!!");
const aside = document.querySelector(".aside_block");

function buildBlock(data, index) {
  const cards = [];
  for (let i = 0; i < index; i++) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <img src=${data.brands[i].image} alt=${data.brands[i].name} class="card_img">
    <div class="card_info">
    <span class="card_brand">${data.brands[i].name}</span>
    <div class="card_name">${data.brands[i].text}</div>
    <div class="card_sale">
        <span class="card_sale_text">Скидки</span>
        <div class="card_sale__cashback-container">
            <div class="card_sale__cashback">Кешбэк</div>
            <div class="card_sale__cashback-percent">${data.brands[i].cashback}%</div>
        </div>
    </div>
    <span class="card_subtitle">${data.brands[i].description}</span>
    </div>
    `;

    cards.push(card);
  }
  return cards;
}

function buildPlace(data, index, place) {
  if (place) {
    while (place.firstChild) {
      place.removeChild(place.firstChild);
    }
  }
  const block = buildBlock(data, index);

  block.forEach((element) => {
    place.appendChild(element);
  });
}

const showAll = document.querySelector(".show-all");
const showAllButton = document.querySelector("aside .header_sale__decoration");

showAll.addEventListener("click", () => {
  showAll.style.display = "none";
  showAllButton.style.display = "none";
  buildPlace(data, data.brands.length, aside);
});
// for main ------------------------------------
const salesContainer = document.querySelector(".sales_container");
