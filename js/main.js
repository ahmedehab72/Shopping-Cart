var userNameInput = document.getElementById("userName");
var userEmailInput = document.getElementById("userEmail");
var userPassInput = document.getElementById("userPass");

var signEmailInput = document.getElementById("signEmail");
var signPassInput = document.getElementById("signPass");

var btnSubmit = document.getElementById("submitBtn");
// var users=[];
var users;
//there is no data stored
if (localStorage.getItem("usersList") == null) {
  var users = [];
} else {
  users = JSON.parse(localStorage.getItem("usersList"));
}
function addUser() {
  if (!checkIsEmpty()) {
    if (exist()) {
      displayExist();
    } else {
      var user = {
        name: userNameInput.value,
        email: userEmailInput.value,
        password: userPassInput.value,
      };
      users.push(user);
      localStorage.setItem("usersList", JSON.stringify(users));
      displaySucess();
    }
  } else {
    displayRequired();
  }
}
function welcome() {
  document.getElementById("welcome").innerHTML = `Welcome ${JSON.parse(
    localStorage.getItem("homeList")
  )}`;
}

function exist() {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == userEmailInput.value) {
      return true;
    }
  }
  return false;
}

function existLogin() {
  for (var i = 0; i < users.length; i++) {
    if (
      users[i].email == signEmailInput.value &&
      users[i].password == signPassInput.value
    ) {
      console.log(users[i].name);
      var name = users[i].name;
      localStorage.setItem("homeList", JSON.stringify(name));
      location.replace("home.html");
      // console.log("3lam");
      return true;
    }
  }
}
function searchUser() {
  if (checkIsEmptySign()) {
    displayRequiredSign();
    console.log("5raba 2nta");
  } else {
    if (existLogin()) {
    } else {
      displayIncorrect();
    }
  }
}
function clearForm() {
  userNameInput.value = "";
  userEmailInput.value = "";
  userPassInput.value = "";

  //    console.log("Done ya m3lm");
}

function checkIsEmpty() {
  if (
    userNameInput.value != "" &&
    userPassInput.value != "" &&
    userEmailInput.value != ""
  ) {
    return false;
  } else {
    return true;
  }
}
function checkIsEmptySign() {
  if (signEmailInput.value == "" || signPassInput.value == "") {
    return true;
  } else {
    return false;
  }
}

// email already exists
function displayRequired() {
  document.getElementById(
    "required"
  ).innerHTML = `<span class=' text-danger'>All inputs is required</span>`;
}
function displayExist() {
  document.getElementById(
    "required"
  ).innerHTML = `<span class=' text-danger'>email already exists</span>`;
}
function displayIncorrect() {
  document.getElementById(
    "result-sign"
  ).innerHTML = `<span class=' text-danger'>incorrect email or password</span>`;
}
function displayRequiredSign() {
  document.getElementById(
    "result-sign"
  ).innerHTML = `<span class=' text-danger'>All inputs is required</span>`;
}
function displaySucess() {
  document.getElementById(
    "required"
  ).innerHTML = `<span class=' text-success'>Success</span>`;
}



/// shopping cart

let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCart = document.querySelector(".icon-cart");
let iconCartSpan = document.querySelector(".icon-cart span");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let products = [];
let cart = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

const addDataToHTML = () => {
  // remove datas default from HTML

  // add new datas
  if (products.length > 0) {
    // if has data
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.dataset.id = product.id;
      newProduct.classList.add("item");
      newProduct.innerHTML = `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
      listProductHTML.appendChild(newProduct);
    });
  }
};
listProductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("addCart")) {
    let id_product = positionClick.parentElement.dataset.id;
    addToCart(id_product);
  }
});
const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity =
      cart[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.dataset.id = item.product_id;

      let positionProduct = products.findIndex(
        (value) => value.id == item.product_id
      );
      let info = products[positionProduct];
      listCartHTML.appendChild(newItem);
      newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
    });
  }
  iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantityCart(product_id, type);
  }
});
const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    let info = cart[positionItemInCart];
    switch (type) {
      case "plus":
        cart[positionItemInCart].quantity =
          cart[positionItemInCart].quantity + 1;
        break;

      default:
        let changeQuantity = cart[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          cart[positionItemInCart].quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
};

const initApp = () => {
  // get data product
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      addDataToHTML();

      // get data cart from memory
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
initApp();
