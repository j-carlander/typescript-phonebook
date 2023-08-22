const addContactForm: HTMLFormElement = document.querySelector(
  ".add-contact-form"
) as HTMLFormElement;
const contactField: HTMLInputElement = document.querySelector(
  ".contact-field"
) as HTMLInputElement;
const contactsList: HTMLUListElement = document.querySelector(
  ".contacts-list"
) as HTMLUListElement;

const contacts: string[] = [];

function createListItem(item: string): HTMLLIElement {
  let li: HTMLLIElement = document.createElement("li");
  li.innerText = item;
  return li;
}

function appendToContactsList(contacts: string[]): void {
  contactsList.innerHTML = "";
  contacts.forEach((contact: string): void =>
    contactsList.append(createListItem(contact))
  );
}

// if the contacts list is not empty on first run, append the contacts to the Contacts list in DOM
if (contacts.length > 0) appendToContactsList(contacts);

addContactForm.addEventListener("submit", (e): void => {
  e.preventDefault();
  contacts.push(contactField.value);
  appendToContactsList(contacts);
  contactField.value = "";
});
