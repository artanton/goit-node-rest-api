import Contact from "../models/contact.js";

export const listContacts = () => Contact.find();

export const getContactById = (id) => Contact.findById(id);

export const addContact = async (data) => {
  const newContact = await Contact.create(data);
  return newContact;
};

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data);

export const removeContact = (id) => Contact.findByIdAndDelete(id);
