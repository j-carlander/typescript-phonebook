"use strict";
const addContactForm = document.querySelector(".add-contact-form");
const contactField = document.querySelector(".contact-field");
const contacts = [];
addContactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contacts.push(contactField.value);
    console.log(contacts);
    contactField.value = "";
});
