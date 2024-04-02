import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

import * as authService from "../services/authServices.js";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const avatarsPath = path.resolve("public", "avatars");

dotenv.config();
const { JWT_SECRET } = process.env;

const signUp = async (req, res) => {
  const { email } = req.body;

  const isUserExist = await authService.findUser({ email });
  if (isUserExist) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await authService.signup(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatar: newUser.avatarURL,
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const isUserExist = await authService.findUser({ email });
  if (!isUserExist) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparePassword = await authService.validatePassword(
    password,
    isUserExist.password
  );
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }
  const { _id: id } = isUserExist;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  await authService.updateUser({ _id: id }, { token });
  res.json({ token });
};

const update = async (req, res) => {
 
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;

  const newPath = path.join(avatarsPath, filename);

  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);

  await authService.updateUser({ _id }, { avatarURL});

  res.status(200).json({
    avatarURL
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await authService.updateUser({ _id }, { token: "" });

  res.status(204).json("No Content");
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  update: ctrlWrapper(update),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
