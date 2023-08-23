"use strict";
/** Document Query selections */
// add a new contact form
const addContactForm = document.querySelector(".add-contact-form");
// The table for rendering contacts
const contactsTableBody = document.querySelector(".contacts-table-body");
// Sorting buttons
const sortLNameBtn = document.querySelector(".sort-lname-btn");
const sortFNameBtn = document.querySelector(".sort-fname-btn");
const sortPhoneBtn = document.querySelector(".sort-phone-btn");
// Dialog and form for checking if admin
const adminCheckDialog = document.querySelector("#adminCheck");
const adminCheckInput = adminCheckDialog.querySelector("input");
const adminCheckConfirmForm = adminCheckDialog.querySelector("#confirm-dialog-form");
/** Initiating the contacts list with a set of contacts */
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
/** Functions */
adminCheckDialog.addEventListener("close", () => {
    if (checkIfAdmin(adminCheckDialog.returnValue)) {
        if (adminCheckDialog.dataset.action === "hide")
            hideContactNumber(Number(adminCheckDialog.dataset.contactId));
        if (adminCheckDialog.dataset.action === "delete")
            deleteContact(Number(adminCheckDialog.dataset.contactId));
    }
    adminCheckInput.value = "";
});
adminCheckConfirmForm.addEventListener("submit", (e) => {
    e.preventDefault();
    adminCheckDialog.close(adminCheckInput.value);
});
function checkIfAdmin(password) {
    if (password === "admin")
        return true;
    return false;
}
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
// Creating the table row to be appended to the table
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
// Appending each contact in contacts to the table and adding the eventlisteners for the buttons for hiding and deleting contacts
function appendToContactsTable(contacts) {
    var _a, _b;
    contactsTableBody.innerHTML = "";
    contacts.forEach((contact) => contactsTableBody.append(createTableRow(contact)));
    (_a = document.querySelectorAll(".hide-contact-btn")) === null || _a === void 0 ? void 0 : _a.forEach((btn) => btn.addEventListener("click", (e) => {
        let target = e.target;
        adminCheckDialog.dataset.contactId = target.dataset.id;
        adminCheckDialog.dataset.action = "hide";
        adminCheckDialog.showModal();
    }));
    (_b = document.querySelectorAll(".delete-contact-btn")) === null || _b === void 0 ? void 0 : _b.forEach((btn) => btn.addEventListener("click", (e) => {
        let target = e.target;
        adminCheckDialog.dataset.contactId = target.dataset.id;
        adminCheckDialog.dataset.action = "delete";
        adminCheckDialog.showModal();
    }));
}
// get the value from a input field by referense
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
// The event listener for adding a new contact
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
/** Sorting the contacts list by either name or number both asc and desc */
// needed variables for sorting
let isSorted = false;
let sortedAsc = false;
// the sorting function able to take in what attribute to sort by
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
// adding the sorting function to the eventlisteners for the sorting buttons
sortLNameBtn.addEventListener("click", () => sortContactsBy("lName"));
sortFNameBtn.addEventListener("click", () => sortContactsBy("fName"));
sortPhoneBtn.addEventListener("click", () => sortContactsBy("phone"));
/** if the contacts list is not empty on first run, append the contacts to the Contacts list in DOM */
if (contacts.length > 0)
    appendToContactsTable(contacts);
