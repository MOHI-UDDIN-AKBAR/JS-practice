// Selected Elements
const alert = document.querySelector(".alert");
const form = document.querySelector("form");
const grocery = document.querySelector("form input");
const submitBtn = document.querySelector("form button");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clear = document.querySelector(".clear");

// Declare Variables
let editElement;
let editID = "";
let editFlag = false;

// Functions
const createElement = (id, value) => {
  const element = document.createElement("div");
  element.classList.add("grocery-item");
  const attribute = document.createAttribute("data-id");
  attribute.value = id;
  element.setAttributeNode(attribute);

  element.innerHTML = `<p>${value}</p>
<div class="grocery-btn">
<span type="button" class="edit-btn">
<i class="fa-solid fa-pen-to-square"></i>
</span>
<span type="button" class="delete-btn">
<i class="fa-solid fa-trash"></i>
</span>
</div>`;
  list.appendChild(element);

  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteGrocery);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editGrocery);
  container.classList.add("display-groceries");
};

//------------------displayAlert------------------
const displayAlert = (text, action) => {
  alert.innerText = text;
  alert.classList.add(`color-${action}`);
  setTimeout(() => {
    alert.innerContent = "";
    alert.classList.remove(`color-${action}`);
  }, 1000);
};

//-------------setBackToDefault------------------
const setBackToDefault = () => {
  editFlag = false;
  editID = "";
  submitBtn.innerHTML = "Submit";
  grocery.value = "";
};

//============deleteGrocery============
const deleteGrocery = (e) => {
  const element = e.target.parentElement.parentElement.parentElement;
  list.removeChild(element);
  const lists = document.querySelectorAll(".grocery-item");
  if (lists.length === 0) container.classList.remove("display-groceries");
  deleteFromLocalStorage(element.dataset.id);
  displayAlert("Grocery deleted from the list", "danger");
  setBackToDefault();
};

//===============editGrocery===========
const editGrocery = (e) => {
  const element = e.target.parentElement.parentElement.parentElement;
  editID = element.dataset.id;
  editFlag = true;
  editElement = e.target.parentElement.parentElement.previousElementSibling;
  grocery.value = editElement.innerText;
  submitBtn.innerText = "Edit";
};

//-----------addGrocery---------------
const addGrocery = (e) => {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
    createElement(id, value);
    // const element = document.createElement("div");
    // element.classList.add("grocery-item");
    // const attribute = document.createAttribute("data-id");
    // attribute.value = id;
    // element.setAttributeNode(attribute);

    // element.innerHTML = `<p>${value}</p>
    // <div class="grocery-btn">
    // <span type="button" class="edit-btn">
    // <i class="fa-solid fa-pen-to-square"></i>
    // </span>
    // <span type="button" class="delete-btn">
    // <i class="fa-solid fa-trash"></i>
    // </span>
    // </div>`;
    // list.appendChild(element);

    // const deleteBtn = element.querySelector(".delete-btn");
    // deleteBtn.addEventListener("click", deleteGrocery);
    // const editBtn = element.querySelector(".edit-btn");
    // editBtn.addEventListener("click", editGrocery);
    // container.classList.add("display-groceries");
    addItemToLocalStorage({ id, value });
    displayAlert("grocery Added to the list", "success");
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerText = value;
    changeGroceryNameInLocalStorage(editID, value);
    displayAlert("Grocery name changed", "success");
    setBackToDefault();
  } else {
    displayAlert("Empty grocery", "danger");
    setBackToDefault();
  }
};

//------------------clearAllGroceries------------
const clearAllGroceries = () => {
  const groceries = document.querySelectorAll(".grocery-item");
  groceries.forEach((grocery) => {
    list.removeChild(grocery);
  });
  container.classList.remove("display-groceries");
  displayAlert("cleared all items", "danger");
  localStorage.removeItem("lists");
  setBackToDefault();
};

// Event Listeners
form.addEventListener("submit", addGrocery);
clear.addEventListener("click", clearAllGroceries);

// LocalStorage
const getGroceriesFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("lists")) || [];

const deleteFromLocalStorage = (id) => {
  const groceries = getGroceriesFromLocalStorage();
  const newGroceries = groceries.filter((grocery) => grocery.id !== id);
  localStorage.setItem("lists", JSON.stringify(newGroceries));
};

const addItemToLocalStorage = (grocery) => {
  const groceries = getGroceriesFromLocalStorage();
  groceries.push(grocery);
  localStorage.setItem("lists", JSON.stringify(groceries));
};
const changeGroceryNameInLocalStorage = (editID, value) => {
  const groceries = getGroceriesFromLocalStorage();
  const newGroceries = groceries.map((grocery) => {
    if (grocery.id === editID) {
      grocery.value = value;
    }
    return grocery;
  });
  localStorage.setItem("lists", JSON.stringify(newGroceries));
};

window.addEventListener("load", () => {
  const groceries = getGroceriesFromLocalStorage();
  if (groceries.length !== 0) {
    groceries.forEach((grocery) => {
      createElement(grocery.id, grocery.value);
    });
  }
});
