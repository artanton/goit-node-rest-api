import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const userSchema = new Schema ({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      
    password: {
        type: String,
        required: [true, 'Password is required'],
      },
      
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: {
        type: String,
        default: null,
      }},
      {versionKey: false, timestamps: true
});
userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model ("user", userSchema);

export default User;