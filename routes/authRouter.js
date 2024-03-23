import express from "express";
import authController from "../controllers/authControllers.js";
import { signInSchema, signUpSchema } from "../schemas/userSchemas.js";
import validateBody from "../decorators/validateBody.js";
import authentificate from "../middlewares/authentificate.js";

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

authRouter.get("/current", authentificate, authController.getCurrent);
authRouter.post("/logout", authentificate, authController.logout);

export default authRouter;
