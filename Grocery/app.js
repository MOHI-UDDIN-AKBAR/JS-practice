//Selected Elements
const alert = document.querySelector(".alert");
const form = document.querySelector("form");
const submitButton = document.querySelector("form button");
const grocery = document.querySelector("#grocery");

const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearButton = document.querySelector(".clear");

//Declare Variables
let editElement;
let editID = "";
let editFlag = false;

//Functions

//==========display alert=======
const displayAlert = (text, action) => {
  alert.textContent = text;
  alert.classList.add(`color-${action}`);
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`color-${action}`);
  }, 1200);
};

//===========setBackToDefault=========
const setBackToDefault = () => {
  editFlag = false;
  editID = "";
  grocery.value = "";
  submitButton.innerText = "Submit";
};

//=================deleteGrocery=================
const deleteGrocery = (e) => {
  const element = e.target.parentElement.parentElement.parentElement;
  list.removeChild(element);

  const allGroceries = document.querySelectorAll(".grocery-item");
  if (allGroceries.length === 0) {
    container.classList.remove("display-groceries");
  }

  displayAlert("one item remove from the list", "danger");
  setBackToDefault();
  removeFromLocalStorage(element.dataset.id);
};

//-----------------editGrocery-------------------
const editGrocery = (e) => {
  const element = e.target.parentElement.parentElement.parentElement;
  editID = element.dataset.id;
  // editElement which contain name of grocery
  editElement = e.target.parentElement.parentElement.previousElementSibling;
  grocery.value = editElement.innerText;
  submitButton.innerText = "Edit";
  editFlag = true;
};

// -------------Add grocery item-------------
let addItem = (e) => {
  e.preventDefault();

  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
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
    // find and add event listeners to both buttons
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteGrocery);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editGrocery);

    list.appendChild(element);
    container.classList.add("display-groceries");
    displayAlert("item added to the list", "success");
    setBackToDefault();
    addItemToLocalStorage(id, value);
  } else if (value && editFlag) {
    editElement.innerText = value;
    displayAlert("item name changed", "success");
    editToLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("Sorry ! Empty Value", "danger");
    setBackToDefault();
  }
};

//Event Listeners
form.addEventListener("submit", addItem);

//LocalStorage
const addItemToLocalStorage = (id, value) => {};
const removeFromLocalStorage = (id) => {};
const editToLocalStorage = (editID, value) => {};
