import Contact from "../models/contact.js";

export const listContacts = (filter = {}, query = {}) =>
  Contact.find(filter, "-createdAt -updatedAt", query);

export const getContactById = (id) => Contact.findById(id);

export const addContact = async (data) => {
  const newContact = await Contact.create(data);
  return newContact;
};

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data);

export const removeContact = (id) => Contact.findByIdAndDelete(id);

export const updateStatusContact = (id, data) =>
  Contact.findByIdAndUpdate(id, data);
