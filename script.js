let data, ourData;
fetch("data.json")
  .then((response) => response.json())
  .then((fetchData) => {
    data = fetchData;

    buildPlace(data, 4, aside);
    asideAllBlock.textContent = data.brands.length;
    ourData = {
      brands: fetchData.brands.filter((element) => {
        return element.date ? element : "";
      }),
    };

    buildPlace(ourData, 3, salesContainer);
  })
  .catch((error) => {
    console.error("Ошибка загрузки:", error);
  });

const aside = document.querySelector(".aside_block");
const asideAllBlock = document.querySelector(".aside_all-number");

function buildBlock(data, index) {
  const cards = [];
  const limit = Math.min(index, data.brands.length);
  for (let i = 0; i < limit; i++) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <img src=${data.brands[i].image} alt=${
      data.brands[i].name
    } class="card_img">
    ${
      data.brands[i].date
        ? `<span class="card_date">${data.brands[i].date}</span>`
        : ""
    }
    <div class="card_info">
    <span class="card_brand">${data.brands[i].name}</span>
    <div class="card_name">${data.brands[i].text}</div>
    <div class="card_sale">
        <span class="card_sale_text">Скидки</span>
        <div class="card_sale__cashback-container">
            <div class="card_sale__cashback">Кешбэк</div>
            <div class="card_sale__cashback-percent">${
              data.brands[i].cashback
            }%</div>
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

function asideHeight() {
  const aside = document.querySelector(".aside_block");
  const asideBlock = document.querySelector("aside");
  const height = aside.scrollHeight;
  aside.style.height = height + "px";
  asideBlock.style.height = height + "px";
}

const showAll = document.querySelector(".show-all");
const showAllButton = document.querySelector("aside .header_sale__decoration");

showAll.addEventListener("click", () => {
  showAll.style.display = "none";
  showAllButton.style.display = "none";
  buildPlace(data, data.brands.length, aside);
});

// for main ------------------------------------
const salesEatIndicator = document.querySelector(".sales_eat__indicator");
const salesTelecomIndicator = document.querySelector(
  ".sales_telecom__indicator"
);
const salesShopIndicator = document.querySelector(".sales_shop__indicator");
const salesContainer = document.querySelector(".sales_container");
const sales = document.querySelectorAll(".sales");
salesEatIndicator.style.backgroundColor = "var(--color-red)";

sales.forEach((sale) => {
  sale.addEventListener("click", () => {
    if (sale.dataset.id === "eat") {
      salesEatIndicator.style.backgroundColor = "var(--color-red)";
      salesTelecomIndicator.style.backgroundColor = "var(--color-back)";
      salesShopIndicator.style.backgroundColor = "var(--color-back)";
      buildPlace(filterData("eat"), 3, salesContainer);
    } else if (sale.dataset.id === "telecom") {
      salesTelecomIndicator.style.backgroundColor = "var(--color-red)";
      salesEatIndicator.style.backgroundColor = "var(--color-back)";
      salesShopIndicator.style.backgroundColor = "var(--color-back)";
      buildPlace(filterData("telecom"), 3, salesContainer);
    } else if (sale.dataset.id === "shop") {
      salesShopIndicator.style.backgroundColor = "var(--color-red)";
      salesEatIndicator.style.backgroundColor = "var(--color-back)";
      salesTelecomIndicator.style.backgroundColor = "var(--color-back)";
      buildPlace(filterData("shop"), 3, salesContainer);
    }
  });
});

function filterData(param) {
  const arr = [];
  data.brands.forEach((element) => {
    if (element.group === param) {
      arr.push(element);
    }
  });
  return { brands: arr };
}
// for velcom ------------------------------------------------------------------
const velcomNext = document.querySelector(".velcome__next");
const velcomShowNext = document.querySelector(".velcome__show-next");
velcomShowNext.addEventListener("click", () => {
  velcomNext.style.display = "block";
  velcomShowNext.style.display = "none";
});
