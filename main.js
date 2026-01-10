const api = `https://fakestoreapi.com/products`;

const heroCard = document.querySelector("#heroCard");
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");

const savat = document.querySelector("#savat");
const shopCount = document.querySelector("#shopCount");

const mainCard = document.querySelector("#mainCard");
const modal = document.querySelector("#modal");
const closeBtn = document.querySelector("#closeBtn");
const modalCard = document.querySelector("#modalCard");
const payNow = document.querySelector("#payNow");
const totalPrice = document.querySelector("#totalPrice");

let scrollCount = 300;

let priceCount = 0;

const cardData = JSON.parse(localStorage.getItem("cardData")) || [];

let allData = [];

rightBtn.addEventListener("click", () => {
  heroCard.scrollBy({ left: scrollCount, behavior: "smooth" });
});

leftBtn.addEventListener("click", () => {
  heroCard.scrollBy({ left: -scrollCount, behavior: "smooth" });
});

savat.addEventListener("click", () => {
  modal.classList.remove("scale-0");
  modal.classList.add("scale-100");
});

// -----------------

closeBtn.addEventListener("click", () => {
  modal.classList.add("scale-0");
  modal.classList.remove("scale-100");
});

const getProduct = async (link) => {
  const req = await fetch(link);
  const data = await req.json();

  writeData(data);
  allData = data;
};
getProduct(api);

const writeData = (info) => {
  heroCard.innerHTML = "";
  mainCard.innerHTML = "";
  info.forEach((item) => {
    heroCard.innerHTML += `<div class="box min-w-67 bg-[#FFFFFF] rounded-[20px]">
              <div
                class="imgs h-60 flex justify-center bg-[#FAFAFA] rounded-t-[20px] p-5"
              >
                <img
                  class="w-full object-contain relative "
                  src=${item.image}
                  alt=""
                />
              </div>
              <div class="text p-5 pb-10">
                <span class="font-normal text-[16.76px] text-[#8D8D8D] mb-3"
                  >Chair</span
                >
                <h2 class="font-semibold text-[21.33px] text-[#1D1F23] mb-6">
                  ${item.title.slice(0, 15)}
                </h2>
                <div class="shop flex justify-between items-center">
                  <span class="font-semibold text-[21.33px] text-[#1D1F23]"
                    ><sup>$</sup> ${item.price}</span
                  >
                  <button onclick="addToCard(${item.id})" 
                    class="w-11 h-11 rounded-full bg-[#F79D4B] cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out hover:shadow-lg shadow-[#f79e4ba8]"
                  >
                    <i class="text-white text-[18px] fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>`;
    mainCard.innerHTML += `<div class="box min-w-67 max-w-67 bg-[#FFFFFF] rounded-[20px]">
              <div
                class="imgs h-60 flex justify-center bg-[#FAFAFA] rounded-t-[20px] p-5"
              >
                <img
                  class=" w-full object-contain relative "
                  src=${item.image}
                  alt=""
                />
              </div>
              <div class="text p-5 pb-10">
                <span class="font-normal text-[16.76px] text-[#8D8D8D] mb-3"
                  >Chair</span
                >
                <h2 class="font-semibold text-[21.33px] text-[#1D1F23] mb-6">
                  ${item.title.slice(0, 15)}
                </h2>
                <div class="shop flex justify-between items-center">
                  <span class="font-semibold text-[21.33px] text-[#1D1F23]"
                    ><sup>$</sup> ${item.price}</span
                  >
                  <button onclick="addToCard(${item.id})" 
                    class="w-11 h-11 rounded-full bg-[#F79D4B] cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out hover:shadow-lg shadow-[#f79e4ba8]"
                  >
                    <i class="text-white text-[18px] fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>`;
  });
};

const toPrice = () => {
  priceCount = 0;

  cardData.forEach((item) => {
    priceCount += item.price;
  });
  totalPrice.textContent = `${priceCount.toFixed(2)}`;
};

const modalCartData = (data) => {
  modalCard.innerHTML = "";
  data.forEach((item) => {
    modalCard.innerHTML += `<div class="box flex items-center justify-between mb-5">
                <div class="flex gap-3 items-center">
                  <div class="imgs w-15 h-15">
                    <img
                      class="w-full h-full object-contain"
                      src=${item.image}
                      alt=""
                    />
                  </div>
                  <div>
                    <h4 class="font-semibold text-[18px] text-[#1D1F23]">
                      ${item.title.slice(0, 15)}
                    </h4>
                    <span class="font-normal text-[16px] text-[#8D8D8D]"
                      >Chair</span
                    >
                  </div>
                </div>
                <div class="flex gap-5 items-center">
                  <span class="font-semibold text-[18px] text-[#1D1F23]"
                    >$${item.price}</span
                  >
                  <i onclick="del(${
                    item.id
                  })" class="text-red-500 cursor-pointer fa-solid fa-trash"></i>
                </div>
              </div>`;
  });
  shopCount.textContent = cardData.length;
  if (cardData.length == 0) {
    modal.classList.add("scale-0");
    modal.classList.remove("scale-100");
  }
  localStorage.setItem("cardData", JSON.stringify(cardData));
};
modalCartData(cardData);
toPrice();

const addToCard = (id) => {
  const newCart = allData?.find((item) => {
    return item.id == id;
  });

  const obj = {
    id: Math.floor(Math.random() * 9999),
    image: newCart.image,
    title: newCart.title,
    price: newCart.price,
  };

  cardData.push(obj);
  modalCartData(cardData);
  toPrice();
};

const del = (id) => {
  const newCard = cardData?.filter((item) => item.id !== id);

  cardData.length = 0;

  cardData.push(...newCard);
  modalCartData(cardData);
  toPrice();
};

payNow.addEventListener("click", () => {
  if (cardData.length == 0) {
    alert("Mahsulot tanlamagansiz");
  } else {
    modalCard.textContent = "";
    alert("Xarid qilindi");
  }

  modal.classList.add("scale-0");
  modal.classList.remove("scale-100");

  cardData.length = 0;
  localStorage.removeItem("cardData");
  priceCount = 0;
  totalPrice.textContent = "$0.00";
  shopCount.textContent = cardData.length;
});
