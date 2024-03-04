import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data); 
};

export const getContactById = async (id) => {
  const contacts = await listContacts();
  const searchedContact = contacts.find((item) => item.id === id);
  return searchedContact || null;
};

export const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  } else {
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));

    return result;
  }
};

export const addContact = async (name, email, phone) => {
  const data = {name, email, phone}
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));

  return newContact;
};

export const updateContactById = async (id, data) =>{
  
  const contacts = await listContacts();
  const index = contacts.findIndex(item=>item.id===id);
  if(index===-1){
    return null;
  }else{
    contacts [index]= {
      ...contacts[index], ...data
    };
    await fs.writeFile (contactsPath, JSON.stringify(contacts, null, 1));
  return contacts[index];
  }
}
