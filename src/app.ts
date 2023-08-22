const addContactForm: HTMLFormElement = document.querySelector(
  ".add-contact-form"
) as HTMLFormElement;

const contactsTableBody: HTMLTableSectionElement = document.querySelector(
  ".contacts-table-body"
) as HTMLTableSectionElement;

const sortLNameBtn: HTMLButtonElement = document.querySelector(
  ".sort-lname-btn"
) as HTMLButtonElement;
const sortFNameBtn: HTMLButtonElement = document.querySelector(
  ".sort-fname-btn"
) as HTMLButtonElement;
const sortPhoneBtn: HTMLButtonElement = document.querySelector(
  ".sort-phone-btn"
) as HTMLButtonElement;

const contacts: Contact[] = [
  {
    fName: "Herr",
    lName: "Gurka",
    phone: 125697752,
  },
  {
    fName: "Opsis",
    lName: "Kalopsis",
    phone: 1531438,
  },
  {
    fName: "Krakel",
    lName: "Spektakel",
    phone: 13846846,
  },
  {
    fName: "Bror",
    lName: "Gurka",
    phone: 5143843770,
  },
  {
    fName: "Kusin",
    lName: "Vitamin",
    phone: 984984677,
  },
];

function createTableRow(contact: Contact): HTMLTableRowElement {
  let tr: HTMLTableRowElement = document.createElement("tr");
  tr.classList.add("contacts-table-row");
  tr.innerHTML = `<td>${contact.fName}</td><td>${contact.lName}</td><td> ${contact.phone}</td>`;
  return tr;
}

function appendToContactsTable(contacts: Contact[]): void {
  contactsTableBody.innerHTML = "";
  contacts.forEach((contact: Contact): void =>
    contactsTableBody.append(createTableRow(contact))
  );
}

function getFormFieldValue(
  ref: "#fName-field" | "#lName-field" | "#phone-field"
): string | number {
  if (ref === "#phone-field") {
    let field: HTMLInputElement = document.querySelector(
      ref
    ) as HTMLInputElement;
    let value: number = Number(field.value);
    field.value = "";
    return value;
  }
  let field: HTMLInputElement = document.querySelector(ref) as HTMLInputElement;
  let value: string = field.value;
  field.value = "";
  return value;
}

// if the contacts list is not empty on first run, append the contacts to the Contacts list in DOM
if (contacts.length > 0) appendToContactsTable(contacts);

addContactForm.addEventListener("submit", (e): void => {
  e.preventDefault();
  let newContact: Contact = {
    fName: getFormFieldValue("#fName-field") as string,
    lName: getFormFieldValue("#lName-field") as string,
    phone: getFormFieldValue("#phone-field") as number,
  };
  contacts.push(newContact);
  appendToContactsTable(contacts);
});

let isSorted: true | false = false;
let sortedAsc: true | false = false;

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

sortLNameBtn.addEventListener("click", (): void => sortContactsBy("lName"));
sortFNameBtn.addEventListener("click", (): void => sortContactsBy("fName"));
sortPhoneBtn.addEventListener("click", (): void => sortContactsBy("phone"));
