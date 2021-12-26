const form = document.querySelector(".form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const grocertContainer = document.querySelector(".grocery-container");
const groceryList = document.querySelector(".grocery-list");

let editFlag = false;
let editElement = "";
let editId = "";

window.addEventListener("DOMContentLoaded", showLocalItems);
submitBtn.addEventListener("click", submitItem);

function submitItem(e) {
  e.preventDefault();

  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    createElement(id, value);
    const item = { id, value };
    let items = getLocal();
    items.push(item);
    localStorage.setItem("list", JSON.stringify(items));
    setAlert("add one item", "success");
    setToDefault();
  } else if (value && editFlag) {
    editElement.textContent = value;
    console.log(editId);
    editLocalItem(editId, value);
    setAlert("edit one item", "success");
    setToDefault();
  } else {
  }
}

function createElement(id, value) {
  const element = document.createElement("article");
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.setAttribute("class", "grocery-item");
  element.innerHTML = `<p>${value}</p>
  <div class="btn-container">
    <button class="btn edit-btn">
      <i class="fas fa-edit"></i>
    </button>
    <button class="btn delete-btn">
      <i class="fas fa-times"></i>
    </button>
  </div>`;
  groceryList.appendChild(element);
  grocertContainer.classList.add("show");
  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");
  const clearBtn = grocertContainer.querySelector(".clear-btn");
  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);
  clearBtn.addEventListener("click", clearItem);
}

function setToDefault() {
  let editFlag = false;
  let editElement = "";
  let editId = "";
  submitBtn.textContent = "submit";
  grocery.value = "";
}

function setAlert(msg, bcg) {
  alert.classList.add(`alert-${bcg}`);
  alert.textContent = msg;
  setTimeout(() => {
    alert.classList.remove(`alert-${bcg}`);
    alert.textContent = "";
  }, 1000);
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  element.remove();

  deleteLocalItem(element.dataset.id);
}

function editItem(e) {
  const element = e.currentTarget.parentElement;
  editFlag = true;
  editId = element.parentElement.dataset.id;
  editElement = element.previousElementSibling;
  // console.log(element);
  grocery.value = element.previousElementSibling.textContent;
  submitBtn.textContent = "edit";
}

function clearItem() {
  groceryList.innerHTML = "";
  grocertContainer.classList.remove("show");
  clearLocalItems();
}

function getLocal() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function showLocalItems() {
  let items = getLocal();

  if (items.length > 0) {
    items.map((item) => {
      createElement(item.id, item.value);
    });
  }
}
function clearLocalItems() {
  localStorage.clear();
}
function deleteLocalItem(id) {
  let items = getLocal();
  items = items.filter((item) => item.id !== id);
  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalItem(id, value) {
  let items = getLocal();
  console.log(items);
  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}
