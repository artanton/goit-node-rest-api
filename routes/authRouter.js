import express from "express";
import authController from "../controllers/authControllers.js";
import { signInSchema, signUpSchema, updateSchema } from "../schemas/userSchemas.js";
import validateBody from "../decorators/validateBody.js";
import authentificate from "../middlewares/authentificate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  
  validateBody(signUpSchema),
  authController.signUp
);

authRouter.post(
  "/login",
  
  validateBody(signInSchema),
  authController.signIn
);

authRouter.patch(
  "/avatars",
  upload.single("avatarURL"),
  authentificate,

  authController.update
);

authRouter.get("/current", authentificate, authController.getCurrent);
authRouter.post("/logout", authentificate, authController.logout);

export default authRouter;
