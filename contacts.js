const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    return console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const contactsArray = JSON.parse(data);
    return console.log(contactsArray.find(({ id }) => id === contactId));
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const contactsArray = JSON.parse(data);
    const allIds = contactsArray.map(({ id }) => id);
    const newId = Math.max(...allIds) + 1;
    const newContact = { id: newId, name, email, phone };
    const newData = JSON.stringify([...contactsArray, newContact]);

    fs.writeFile(contactsPath, newData, (err) => {
      if (err) throw err;
      console.table(JSON.parse(newData));
    });
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const contactsArray = JSON.parse(data);
    const newData = JSON.stringify(
      contactsArray.filter(({ id }) => id !== contactId)
    );

    fs.writeFile(contactsPath, newData, (err) => {
      if (err) throw err;
      console.table(JSON.parse(newData));
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
