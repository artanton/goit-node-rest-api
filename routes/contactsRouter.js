import express from "express";
import contactsController from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../decorators/validateBody.js";
import isValidId from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsController.getOneContact);

contactsRouter.post("/",
  validateBody(createContactSchema),
  contactsController.createContact
);

contactsRouter.put("/:id", isValidId, contactsController.updateContact);

contactsRouter.delete("/:id", isValidId, contactsController.deleteContact);

export default contactsRouter;
