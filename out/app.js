"use strict";
const addContactForm = document.querySelector(".add-contact-form");
const contactsTableBody = document.querySelector(".contacts-table-body");
const contacts = [];
function createTableRow(contact) {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${contact.lName}</td><td>${contact.fName}</td><td> ${contact.phone}</td>`;
    return tr;
}
function appendToContactsList(contacts) {
    contactsTableBody.innerHTML = "";
    contacts.forEach((contact) => contactsTableBody.append(createTableRow(contact)));
}
function getFormFieldValue(ref) {
    if (ref === "#phone-field") {
        let field = document.querySelector(ref);
        let value = Number(field.value);
        return value;
    }
    let field = document.querySelector(ref);
    let value = field.value;
    return value;
}
// if the contacts list is not empty on first run, append the contacts to the Contacts list in DOM
if (contacts.length > 0)
    appendToContactsList(contacts);
addContactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newContact = {
        fName: getFormFieldValue("#fName-field"),
        lName: getFormFieldValue("#lName-field"),
        phone: getFormFieldValue("#phone-field"),
    };
    contacts.push(newContact);
    appendToContactsList(contacts);
});
