const addContactForm: HTMLFormElement = document.querySelector(
  ".add-contact-form"
) as HTMLFormElement;
const contactField: HTMLInputElement = document.querySelector(
  ".contact-field"
) as HTMLInputElement;

const contacts: string[] = [];

addContactForm.addEventListener("submit", (e): void => {
  e.preventDefault();
  contacts.push(contactField.value);
  console.log(contacts);
  contactField.value = "";
});
