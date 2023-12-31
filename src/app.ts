/** Document Query selections */
// add a new contact form
const addContactForm: HTMLFormElement = document.querySelector(
  ".add-contact-form"
) as HTMLFormElement;
// The table for rendering contacts
const contactsTableBody: HTMLTableSectionElement = document.querySelector(
  ".contacts-table-body"
) as HTMLTableSectionElement;

// Sorting buttons
const sortLNameBtn: HTMLButtonElement = document.querySelector(
  ".sort-lname-btn"
) as HTMLButtonElement;
const sortFNameBtn: HTMLButtonElement = document.querySelector(
  ".sort-fname-btn"
) as HTMLButtonElement;
const sortPhoneBtn: HTMLButtonElement = document.querySelector(
  ".sort-phone-btn"
) as HTMLButtonElement;

// Dialog and form for checking if admin
const adminCheckDialog: HTMLDialogElement = document.querySelector(
  "#adminCheck"
) as HTMLDialogElement;
const adminCheckInput: HTMLInputElement = adminCheckDialog.querySelector(
  "input"
) as HTMLInputElement;
const adminCheckConfirmForm: HTMLButtonElement = adminCheckDialog.querySelector(
  "#confirm-dialog-form"
) as HTMLButtonElement;

/** Initiating the contacts list with a set of contacts */
const contacts: Contact[] = [
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

function checkIfAdmin(password: string): boolean {
  if (password === "admin") return true;
  return false;
}

function hideContactNumber(id: number): void {
  let index: number = contacts.findIndex(
    (contact: Contact) => contact.id === id
  );
  contacts[index].classified = !contacts[index].classified;
  appendToContactsTable(contacts);
}

function deleteContact(id: number): void {
  let index: number = contacts.findIndex(
    (contact: Contact) => contact.id === id
  );
  contacts.splice(index, 1);
  appendToContactsTable(contacts);
}
// Creating the table row to be appended to the table
function createTableRow(contact: Contact): HTMLTableRowElement {
  let tr: HTMLTableRowElement = document.createElement("tr");
  let phone: string | number = !contact.classified ? contact.phone : "*******";
  let lockSymbol: string = contact.classified ? "&#xf023;" : "&#xf09c;";
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
function appendToContactsTable(contacts: Contact[]): void {
  contactsTableBody.innerHTML = "";
  contacts.forEach((contact: Contact): void =>
    contactsTableBody.append(createTableRow(contact))
  );
  document.querySelectorAll(".hide-contact-btn")?.forEach((btn): void =>
    btn.addEventListener("click", (e): void => {
      let target = e.target as HTMLElement;
      adminCheckDialog.dataset.contactId = target.dataset.id;
      adminCheckDialog.dataset.action = "hide";
      adminCheckDialog.showModal();
    })
  );
  document.querySelectorAll(".delete-contact-btn")?.forEach((btn): void =>
    btn.addEventListener("click", (e): void => {
      let target = e.target as HTMLElement;
      adminCheckDialog.dataset.contactId = target.dataset.id;
      adminCheckDialog.dataset.action = "delete";
      adminCheckDialog.showModal();
    })
  );
}

// get the value from a input field by referense
function getFormFieldValue(
  ref: "#fName-field" | "#lName-field" | "#phone-field" | "#classified"
): string | number | boolean {
  if (ref === "#phone-field") {
    let field: HTMLInputElement = document.querySelector(
      ref
    ) as HTMLInputElement;
    let value: number = Number(field.value);
    field.value = "";
    return value;
  }
  if (ref === "#classified") {
    let field: HTMLInputElement = document.querySelector(
      "#classified"
    ) as HTMLInputElement;
    let checked: boolean = field.checked;
    field.checked = false;
    return checked;
  }

  let field: HTMLInputElement = document.querySelector(ref) as HTMLInputElement;
  let value: string = field.value;

  field.value = "";
  return value;
}
// The event listener for adding a new contact
addContactForm.addEventListener("submit", (e): void => {
  e.preventDefault();

  let newContact: Contact = {
    id: 1000 + contacts.length,
    fName: getFormFieldValue("#fName-field") as string,
    lName: getFormFieldValue("#lName-field") as string,
    phone: getFormFieldValue("#phone-field") as number,
    classified: getFormFieldValue("#classified") as boolean,
  };
  contacts.push(newContact);
  appendToContactsTable(contacts);
});

/** Sorting the contacts list by either name or number both asc and desc */
// needed variables for sorting
let isSorted: true | false = false;
let sortedAsc: true | false = false;

// the sorting function able to take in what attribute to sort by
function sortContactsBy(attribute: "lName" | "fName" | "phone"): void {
  let sortedContacts: Contact[] = [...contacts];
  let domSelector: string = ".sort-" + attribute.toLowerCase() + "-btn";

  let sortBtn: HTMLButtonElement = document.querySelector(
    domSelector
  ) as HTMLButtonElement;

  if (!isSorted) {
    isSorted = !isSorted;
    if (!sortedAsc) {
      sortedAsc = !sortedAsc;
      sortedContacts.sort((a, b) =>
        a[attribute] > b[attribute] ? 1 : a[attribute] < b[attribute] ? -1 : 0
      );

      appendToContactsTable(sortedContacts);
      sortBtn.innerHTML = "&#8593;";
      return;
    }
  }
  if (isSorted) {
    if (sortedAsc) {
      sortedAsc = !sortedAsc;
      sortedContacts.sort((a, b) =>
        a[attribute] > b[attribute] ? -1 : a[attribute] < b[attribute] ? 1 : 0
      );

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
sortLNameBtn.addEventListener("click", (): void => sortContactsBy("lName"));
sortFNameBtn.addEventListener("click", (): void => sortContactsBy("fName"));
sortPhoneBtn.addEventListener("click", (): void => sortContactsBy("phone"));

/** if the contacts list is not empty on first run, append the contacts to the Contacts list in DOM */
if (contacts.length > 0) appendToContactsTable(contacts);
