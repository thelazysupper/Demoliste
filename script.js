// Get elements
const listTitle = document.getElementById("listTitle");
const editTitleBtn = document.getElementById("editTitleBtn");
const titleInput = document.getElementById("titleInput");
const itemInput = document.getElementById("itemInput");
const addItemBtn = document.getElementById("addItemBtn");
const shoppingList = document.getElementById("shoppingList");
const clearListBtn = document.getElementById("clearListBtn");
const saveListBtn = document.getElementById("saveListBtn");

// Load saved title and items from local storage
let savedTitle = localStorage.getItem("shoppingListTitle") || "Shopping List";
let savedItems = JSON.parse(localStorage.getItem("shoppingListItems")) || [];

// Display saved title and items on page load
renderTitle();
renderList(savedItems);

// Add item to list when "Add Item" button is clicked
addItemBtn.addEventListener("click", addItem);

// Add item to list when "Enter" key is pressed in item input field
itemInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    addItem();
  }
});

// Edit item when input field loses focus
shoppingList.addEventListener("blur", function(event) {
  if (event.target.tagName === "INPUT") {
    editItem(event.target);
  }
}, true);

// Delete item when delete button is clicked
shoppingList.addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    deleteItem(event.target);
  }
});

// Clear list when "Clear List" button is clicked
clearListBtn.addEventListener("click", clearList);

// Save list to local storage when "Save
saveListBtn.addEventListener("click", saveList);

// Function to render title
function renderTitle() {
listTitle.innerHTML = savedTitle;
}

// Function to edit title
function editTitle() {
titleInput.value = savedTitle;
listTitle.style.display = "none";
editTitleBtn.style.display = "none";
titleInput.style.display = "inline-block";
titleInput.focus();
}

// Function to save title
function saveTitle() {
savedTitle = titleInput.value || "Shopping List";
localStorage.setItem("shoppingListTitle", savedTitle);
renderTitle();
listTitle.style.display = "inline-block";
editTitleBtn.style.display = "inline-block";
titleInput.style.display = "none";
}

// Function to add item
function addItem() {
const itemName = itemInput.value.trim();
if (itemName) {
savedItems.push({name: itemName});
renderList(savedItems);
itemInput.value = "";
}
}

// Function to edit item
function editItem(itemInput) {
const listItem = itemInput.parentNode;
const newName = itemInput.value.trim();
if (newName) {
const itemIndex = savedItems.findIndex(function(item) {
return item.name === listItem.id;
});
savedItems[itemIndex].name = newName;
} else {
deleteItem(listItem.querySelector("button"));
}
}

// Function to delete item
function deleteItem(deleteBtn) {
deleteBtn.id = "deleteBtn";
const listItem = deleteBtn
.parentNode;
savedItems = savedItems.filter(function(item) {
return item.name !== listItem.id;
});
renderList(savedItems);
}

// Function to clear list
function clearList() {
savedItems = [];
renderList(savedItems);
}

// Function to save list to local storage
function saveList() {
localStorage.setItem("shoppingListItems", JSON.stringify(savedItems));
}

// Function to render list
function renderList(items) {
shoppingList.innerHTML = "";
items.forEach(function(item) {
const listItem = document.createElement("li");
listItem.id = item.name;
const itemInput = document.createElement("input");
itemInput.type = "text";
itemInput.value = item.name;
const deleteBtn = document.createElement("button");
deleteBtn.innerHTML = "Slett";
listItem.appendChild(itemInput);
listItem.appendChild(deleteBtn);
shoppingList.appendChild(listItem);
});
}

// Add event listener to Save Title button
const saveTitleBtn = document.getElementById('save-title-btn');
saveTitleBtn.addEventListener("click", saveTitle);

// Function - changes text from "lagre" to "lagret"
function changeToSaved(){
    document.getElementById("saveListBtn").innerHTML = 'Lagret!';
}

// Reveal title save button on reveal

function revealTitleInput() {
  const saveTitleBtn = document.getElementById("save-title-btn");
  const saveListBtn = document.getElementById("save-list-btn");

  if (saveTitleBtn) {
    saveTitleBtn.style.display = "none";
    saveTitleBtn.style.display = "flex";
  } else {
    saveListBtn.style.display = "none";
    console.log("Save title button not found!");
  }
}

