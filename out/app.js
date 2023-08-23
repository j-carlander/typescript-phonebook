"use strict";
const addContactForm = document.querySelector(".add-contact-form");
const contactsTableBody = document.querySelector(".contacts-table-body");
const sortLNameBtn = document.querySelector(".sort-lname-btn");
const sortFNameBtn = document.querySelector(".sort-fname-btn");
const sortPhoneBtn = document.querySelector(".sort-phone-btn");
const contacts = [
    {
        id: 1000,
        fName: "Herr",
        lName: "Gurka",
        phone: 125697752,
        classified: false,
    },
    {
        id: 1001,
        fName: "Opsis",
        lName: "Kalopsis",
        phone: 1531438,
        classified: true,
    },
    {
        id: 1002,
        fName: "Krakel",
        lName: "Spektakel",
        phone: 13846846,
        classified: false,
    },
    {
        id: 1003,
        fName: "Bror",
        lName: "Gurka",
        phone: 5143843770,
        classified: false,
    },
    {
        id: 1004,
        fName: "Kusin",
        lName: "Vitamin",
        phone: 984984677,
        classified: true,
    },
];
function hideContactNumber(id) {
    let index = contacts.findIndex((contact) => contact.id === id);
    contacts[index].classified = !contacts[index].classified;
    appendToContactsTable(contacts);
}
function deleteContact(id) {
    let index = contacts.findIndex((contact) => contact.id === id);
    contacts.splice(index, 1);
    appendToContactsTable(contacts);
}
function createTableRow(contact) {
    let tr = document.createElement("tr");
    let phone = !contact.classified ? contact.phone : "*******";
    let lockSymbol = contact.classified ? "&#xf023;" : "&#xf09c;";
    tr.classList.add("contacts-table-row");
    tr.innerHTML = `
    <td>${contact.fName}</td>
    <td>${contact.lName}</td>
    <td>${phone}</td>
    <td><button data-id="${contact.id}" class="hide-contact-btn fa">${lockSymbol}</button></td>
    <td><button data-id="${contact.id}" class="delete-contact-btn">&#128465;</button></td>
    `;
    return tr;
}
function appendToContactsTable(contacts) {
    var _a, _b;
    contactsTableBody.innerHTML = "";
    contacts.forEach((contact) => contactsTableBody.append(createTableRow(contact)));
    (_a = document.querySelectorAll(".hide-contact-btn")) === null || _a === void 0 ? void 0 : _a.forEach((btn) => btn.addEventListener("click", (e) => {
        let target = e.target;
        hideContactNumber(Number(target.dataset.id));
    }));
    (_b = document.querySelectorAll(".delete-contact-btn")) === null || _b === void 0 ? void 0 : _b.forEach((btn) => btn.addEventListener("click", (e) => {
        let target = e.target;
        deleteContact(Number(target.dataset.id));
    }));
}
function getFormFieldValue(ref) {
    if (ref === "#phone-field") {
        let field = document.querySelector(ref);
        let value = Number(field.value);
        field.value = "";
        return value;
    }
    if (ref === "#classified") {
        let field = document.querySelector("#classified");
        let checked = field.checked;
        field.checked = false;
        return checked;
    }
    let field = document.querySelector(ref);
    let value = field.value;
    field.value = "";
    return value;
}
// if the contacts list is not empty on first run, append the contacts to the Contacts list in DOM
if (contacts.length > 0)
    appendToContactsTable(contacts);
addContactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newContact = {
        id: 1000 + contacts.length,
        fName: getFormFieldValue("#fName-field"),
        lName: getFormFieldValue("#lName-field"),
        phone: getFormFieldValue("#phone-field"),
        classified: getFormFieldValue("#classified"),
    };
    contacts.push(newContact);
    appendToContactsTable(contacts);
});
let isSorted = false;
let sortedAsc = false;
function sortContactsBy(attribute) {
    let sortedContacts = [...contacts];
    let domSelector = ".sort-" + attribute.toLowerCase() + "-btn";
    let sortBtn = document.querySelector(domSelector);
    if (!isSorted) {
        isSorted = !isSorted;
        if (!sortedAsc) {
            sortedAsc = !sortedAsc;
            sortedContacts.sort((a, b) => a[attribute] > b[attribute] ? 1 : a[attribute] < b[attribute] ? -1 : 0);
            appendToContactsTable(sortedContacts);
            sortBtn.innerHTML = "&#8593;";
            return;
        }
    }
    if (isSorted) {
        if (sortedAsc) {
            sortedAsc = !sortedAsc;
            sortedContacts.sort((a, b) => a[attribute] > b[attribute] ? -1 : a[attribute] < b[attribute] ? 1 : 0);
            appendToContactsTable(sortedContacts);
            sortBtn.innerHTML = "&#8595;";
            return;
        }
        if (!sortedAsc) {
            isSorted = !isSorted;
            appendToContactsTable(contacts);
            sortBtn.innerHTML = "&#8645;";
            return;
        }
    }
}
sortLNameBtn.addEventListener("click", () => sortContactsBy("lName"));
sortFNameBtn.addEventListener("click", () => sortContactsBy("fName"));
sortPhoneBtn.addEventListener("click", () => sortContactsBy("phone"));
