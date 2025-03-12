import React, { useState } from "react";
import "./ContactsFields.css";

function ContactsFields() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [sortBy, setSortBy] = useState("");

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      if (editIndex !== null) {
        const updatedContacts = [...contacts];
        updatedContacts[editIndex] = newContact;
        setContacts(updatedContacts);
        setEditIndex(null);
      } else {
        setContacts([...contacts, newContact]);
      }
      setNewContact({ name: "", phone: "" });
    }
  };

  const deleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  const editContact = (index) => {
    setNewContact(contacts[index]);
    setEditIndex(index);
  };

  const sortContacts = (field) => {
    const sorted = [...contacts].sort((a, b) =>
      a[field].localeCompare(b[field])
    );
    setContacts(sorted);
    setSortBy(field);
  };

  return (
    <div className="app-container">
      <h1>Список контактів</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Ім'я"
          value={newContact.name}
          onChange={(e) =>
            setNewContact({ ...newContact, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Телефон"
          value={newContact.phone}
          onChange={(e) =>
            setNewContact({ ...newContact, phone: e.target.value })
          }
        />
        <button onClick={addContact}>
          {editIndex !== null ? "Редагувати" : "Додати"}
        </button>
      </div>
      <div className="buttons-container">
        <button onClick={() => sortContacts("name")}>
          Сортувати за іменем
        </button>
        <button onClick={() => sortContacts("phone")}>
          Сортувати за телефоном
        </button>
      </div>
      <ul className="contacts-list">
        {contacts.map((contact, index) => (
          <li key={index} className="contact-item">
            <span>
              {contact.name} - {contact.phone}
            </span>
            <div className="actions">
              <button onClick={() => editContact(index)}>Редагувати</button>
              <button onClick={() => deleteContact(index)}>Видалити</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactsFields;
