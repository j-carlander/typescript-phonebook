"use strict";
const addContactForm = document.querySelector(".add-contact-form");
const contactField = document.querySelector(".contact-field");
const contactsList = document.querySelector(".contacts-list");
const contacts = [];
function createListItem(item) {
    let li = document.createElement("li");
    li.innerText = item;
    return li;
}
function appendToContactsList(contacts) {
    contactsList.innerHTML = "";
    contacts.forEach((contact) => contactsList.append(createListItem(contact)));
}
// if the contacts list is not empty on first run, append the contacts to the Contacts list in DOM
if (contacts.length > 0)
    appendToContactsList(contacts);
addContactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contacts.push(contactField.value);
    appendToContactsList(contacts);
    contactField.value = "";
});
